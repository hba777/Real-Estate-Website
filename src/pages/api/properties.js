import pool from "../../utils/db"; // Adjust this path based on your db.js location

const getProperties = async () => {
  const result = await pool.query(`
    SELECT DISTINCT ON (p.property_id, p.location_id)
      p.property_id, 
      p.property_type, 
      p.location_id,
      p.date_added,
      p.price,
      p.area,
      p.area_marla,
      p.baths,
      p.bedrooms,
      l.city,
      l.province_name,
      l.locality,
      l.latitude,
      l.longitude,
      ARRAY_AGG(ENCODE(i.image_data, 'base64')) AS images
    FROM 
      property AS p
    INNER JOIN 
      property_images AS i 
    ON 
      p.property_id = i.property_id
    INNER JOIN 
      location AS l
    ON 
      p.location_id = l.location_id
    GROUP BY 
      p.property_id, p.property_type, p.location_id, p.date_added, p.price, p.area, p.area_marla, p.baths, p.bedrooms, l.city, l.province_name, l.locality, l.latitude, l.longitude;
  `);
  return result.rows;
};

export default async function propertyHandler(req, res) {
  if (req.method === "GET") {
    try {
      const properties = await getProperties();
      res.status(200).json(properties);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error retrieving data from the property table" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
