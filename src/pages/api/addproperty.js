import pool from '../../utils/db'; // Replace with your actual DB connection module

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const formData = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    // Check and/or generate new location_id
    let locationId = formData.location_id;
    const locationQuery = await client.query(
      'SELECT location_id FROM location WHERE latitude = $1 AND longitude = $2',
      [formData.latitude, formData.longitude]
    );

    if (locationQuery.rows.length === 0) {
      // Generate new location_id
      const newLocationId = Math.floor(Math.random() * 100000);
      locationId = newLocationId;

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
    } else {
      locationId = locationQuery.rows[0].location_id;
    }

    // Check and/or generate new property_id
    let propertyId = formData.property_id;
    const propertyQuery = await client.query(
      'SELECT property_id FROM property WHERE property_id = $1',
      [formData.property_id]
    );

    if (propertyQuery.rows.length === 0) {
      // Generate new property_id
      const newPropertyId = Math.floor(Math.random() * 10000000);
      propertyId = newPropertyId;

      await client.query(
        `INSERT INTO property 
          (property_id, property_type, price, area, area_marla, baths, bedrooms, location_id, date_added)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          propertyId,
          formData.property_type,
          formData.price,
          formData.area,
          formData.area_marla,
          formData.baths,
          formData.bedrooms,
          locationId,
          formData.date_added,
        ]
      );
    }

    await client.query('COMMIT'); // Commit transaction

    res.status(200).json({
      message: 'Property and location added successfully',
      property_id: propertyId,
      location_id: locationId,
    });
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback transaction in case of error
    console.error('Transaction Error:', error.message);
    res.status(500).json({ error: 'Error adding property and location' });
  } finally {
    client.release(); // Release the client back to the pool
  }
}
