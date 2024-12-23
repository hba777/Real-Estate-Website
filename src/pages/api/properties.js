// src/pages/api/properties.js

import pool from "../../utils/db";

const addProperty = async (property) => {
  const {
    property_type,
    location_id,
    date_added,
    price,
    area,
    area_marla,
    baths,
    bedrooms,
  } = property;

  const result = await pool.query(
    `
    INSERT INTO property (property_type, location_id, date_added, price, area, area_marla, baths, bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `,
    [
      property_type,
      location_id,
      date_added,
      price,
      area,
      area_marla,
      baths,
      bedrooms,
    ]
  );

  return result.rows[0];
};

const updateProperty = async (id, property) => {
  const {
    property_type,
    location_id,
    price,
    area,
    area_marla,
    baths,
    bedrooms,
  } = property;

  const result = await pool.query(
    `
    UPDATE property 
    SET property_type = $1, location_id = $2, price = $3, area = $4, area_marla = $5, baths = $6, bedrooms = $7
    WHERE property_id = $8
    RETURNING *;
    `,
    [property_type, location_id, price, area, area_marla, baths, bedrooms, id]
  );

  return result.rows[0];
};

const deleteProperty = async (id) => {
  const result = await pool.query(
    `DELETE FROM property WHERE property_id = $1 RETURNING *;`,
    [id]
  );
  return result.rows[0];
};

const getProperties = async (page, resultsPerPage) => {
  const offset = (page - 1) * resultsPerPage;

  const result = await pool.query(
    `
SELECT DISTINCT ON (p.property_id) 
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
  ARRAY_AGG(DISTINCT ENCODE(i.image_data, 'base64')) AS images
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
  );

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
  } else if (req.method === "POST") {
    const property = req.body;
    try {
      const newProperty = await addProperty(property);
      res.status(201).json(newProperty);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error adding property" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const property = req.body;
    try {
      const updatedProperty = await updateProperty(id, property);
      res.status(200).json(updatedProperty);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating property" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const deletedProperty = await deleteProperty(id);
      res.status(200).json(deletedProperty);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting property" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
