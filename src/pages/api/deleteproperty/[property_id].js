import pool from "../../../utils/db"; // Replace with your actual DB connection module

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { property_id } = req.query;
  console.log(property_id);
  if (!property_id) {
    return res.status(400).json({ error: 'property_id is required' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    // Check if the property exists
    const propertyQuery = await client.query(
      'SELECT * FROM property WHERE property_id = $1',
      [property_id]
    );

    if (propertyQuery.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Delete associated images
    await client.query(
      'DELETE FROM property_images WHERE property_id = $1',
      [property_id]
    );

    // Delete the property record
    await client.query(
      'DELETE FROM property WHERE property_id = $1',
      [property_id]
    );

    // Optionally, delete the location if no other properties are associated with it
    const locationIdQuery = await client.query(
      'SELECT location_id FROM property WHERE location_id = $1',
      [propertyQuery.rows[0].location_id]
    );

    if (locationIdQuery.rows.length === 0) {
      await client.query(
        'DELETE FROM location WHERE location_id = $1',
        [propertyQuery.rows[0].location_id]
      );
    }

    await client.query('COMMIT'); // Commit transaction

    res.status(200).json({ message: 'Property and associated data deleted successfully' });
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback transaction in case of error
    console.error('Transaction Error:', error.message);
    res.status(500).json({ error: 'Error deleting property and associated data' });
  } finally {
    client.release(); // Release the client back to the pool
  }
}
