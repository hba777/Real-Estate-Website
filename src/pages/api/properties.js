// src/pages/api/properties.js

import pool from "../../db"; // Adjust this path based on your db.js location

const getProperties = async () => {
  const result = await pool.query("SELECT * FROM property"); // Adjust the SQL query as necessary
  //console.log(result.rows);
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
