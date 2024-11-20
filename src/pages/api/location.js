// src/pages/api/location.js

import pool from "../../utils/db";

// Function to get all data from the location table
export const getLocations = async () => {
  const result = await pool.query("SELECT * FROM location");
  console.log(result.rows);
  return result.rows;

};

// Endpoint function for handling GET requests
export default async function locationHandler (req, res) {
  if (req.method === "GET") {
    try {
      const locations = await getLocations();
      res.status(200).json(locations);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error retrieving data from the location table" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
