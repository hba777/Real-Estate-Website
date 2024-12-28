import pool from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    property_id,
    property_type,
    price,
    area,
    area_marla,
    baths,
    bedrooms,
    location_id,
    city,
    province_name,
    locality,
    latitude,
    longitude,
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    // Update location details if location_id is provided
    if (location_id) {
      await client.query(
        `UPDATE location
         SET city = $1, province_name = $2, locality = $3, latitude = $4, longitude = $5
         WHERE location_id = $6`,
        [city, province_name, locality, latitude, longitude, location_id]
      );
    }

    // Update property details
    await client.query(
      `UPDATE property
       SET property_type = $1, price = $2, area = $3, area_marla = $4, baths = $5, bedrooms = $6, location_id = $7
       WHERE property_id = $8`,
      [
        property_type,
        price,
        area,
        area_marla,
        baths,
        bedrooms,
        location_id,
        property_id,
      ]
    );

    await client.query("COMMIT"); // Commit transaction

    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback transaction in case of error
    console.error("Transaction Error:", error.message);
    res.status(500).json({ error: "Error updating property" });
  } finally {
    client.release(); // Release the client back to the pool
  }
}
