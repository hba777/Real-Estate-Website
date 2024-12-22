// src/pages/api/properties.js
import pool from "../../utils/db";

const getProperties = async (page, resultsPerPage) => {
  const offset = (page - 1) * resultsPerPage;

  const result = await pool.query(
    `
SELECT 
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
LEFT JOIN 
  property_images AS i 
ON 
  p.property_id = i.property_id
LEFT JOIN 
  location AS l
ON 
  p.location_id = l.location_id
GROUP BY 
  p.property_id, p.property_type, p.location_id, p.date_added, p.price, p.area, p.area_marla, p.baths, p.bedrooms, l.city, l.province_name, l.locality, l.latitude, l.longitude
LIMIT $1 OFFSET $2;
  `,
    [resultsPerPage, offset]
  ); // Passing the parameters to the query

  return result.rows;
};

export default async function propertyHandler(req, res) {
  if (req.method === "GET") {
    const { page = 1, resultsPerPage = 12 } = req.query;
    try {
      const properties = await getProperties(
        Number(page),
        Number(resultsPerPage)
      );
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
