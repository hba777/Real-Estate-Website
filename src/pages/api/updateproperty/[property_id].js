import pool from "../../../utils/db"; // Replace with your actual DB connection module
import { Buffer } from "buffer"; // For converting base64 to Buffer

export default async function handler(req, res) {
  const { property_id } = req.query; // Extract property_id from URL query

  console.log("Extracted Property ID from URL:", property_id);

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!property_id) {
    return res.status(400).json({ error: "Property ID is required in URL" });
  }

  const formData = req.body; // Assuming formData is passed in the request body
  const client = await pool.connect();

  try {
    console.log("Starting transaction...");
    await client.query("BEGIN"); // Start transaction

    // Check if the property exists
    const propertyQuery = await client.query(
      "SELECT property_id FROM property WHERE property_id = $1",
      [property_id] // Use property_id from the URL
    );

    if (propertyQuery.rows.length === 0) {
      // If property does not exist, send an error
      console.log("Property not found:", property_id);
      return res.status(404).json({ error: "Property not found" });
    }

    // Update property details using formData, which should not include property_id (as it's already from URL)
    const updatePropertyQuery = `
      UPDATE property
      SET 
        property_type = $1,
        price = $2,
        area = $3,
        area_marla = $4,
        baths = $5,
        bedrooms = $6,
        date_added = $7
      WHERE property_id = $8
    `;

    await client.query(updatePropertyQuery, [
      formData.property_type,
      formData.price,
      formData.area,
      formData.area_marla,
      formData.baths,
      formData.bedrooms,
      formData.date_added,
      property_id, // Use property_id from the URL
    ]);

    // Check and/or generate new location_id if needed
    let locationId = formData.location_id;
    const locationQuery = await client.query(
      "SELECT location_id FROM location WHERE latitude = $1 AND longitude = $2",
      [formData.latitude, formData.longitude]
    );

    if (locationQuery.rows.length === 0) {
      // Generate new location_id if not exists
      const newLocationId = Math.floor(Math.random() * 100000);
      locationId = newLocationId;

      // Insert new location
      await client.query(
        `INSERT INTO location (location_id, city, province_name, locality, latitude, longitude)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          locationId,
          formData.city,
          formData.province_name,
          formData.locality,
          formData.latitude,
          formData.longitude,
        ]
      );

      // Update the property with the new location_id
      await client.query(
        `UPDATE property SET location_id = $1 WHERE property_id = $2`,
        [locationId, property_id] // Use property_id from the URL
      );
    } else {
      locationId = locationQuery.rows[0].location_id;

      // Update the property with the existing location_id
      await client.query(
        `UPDATE property SET location_id = $1 WHERE property_id = $2`,
        [locationId, property_id] // Use property_id from the URL
      );
    }

    // Update images if provided
    if (formData.images && formData.images.length > 0) {
      // Delete existing images
      await client.query(`DELETE FROM property_images WHERE property_id = $1`, [
        property_id, // Use property_id from the URL
      ]);

      // Insert new images
      const imageInsertPromises = formData.images.map((imageData) => {
        if (imageData) {
          const base64Data = imageData.split(",")[1]; // Get base64 string
          if (base64Data) {
            const buffer = Buffer.from(base64Data, "base64"); // Convert to binary buffer

            return client.query(
              `INSERT INTO property_images (property_id, image_data)
               VALUES ($1, $2)`,
              [property_id, buffer] // Store image as binary data
            );
          } else {
            console.error("Invalid base64 image data:", imageData);
          }
        } else {
          console.error("Image data is undefined or empty:", imageData);
        }
      });

      // Filter out any undefined or invalid image insert promises
      await Promise.all(imageInsertPromises.filter(Boolean));
    }

    console.log("Committing transaction...");
    await client.query("COMMIT"); // Commit transaction

    res.status(200).json({
      message: "Property, location, and images updated successfully",
      property_id: property_id,
      location_id: locationId,
    });
  } catch (error) {
    console.error("Transaction Error:", error.message);
    await client.query("ROLLBACK"); // Rollback transaction in case of error
    res
      .status(500)
      .json({ error: "Error updating property, location, and images" });
  } finally {
    console.log("Releasing client...");
    client.release(); // Release the client back to the pool
  }
}
