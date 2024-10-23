const express = require("express");
const { Pool } = require("pg");
const cors = require("cors"); // Importing the CORS middleware
const app = express();

// Enable CORS for all routes
app.use(cors());

// Database connection details
const pool = new Pool({
  user: "postgres", // Your PostgreSQL username
  password: "BestPasswordEver", // Your PostgreSQL password
  host: "34.133.41.198", // Replace with your VM/Cloud Instance IP or hostname
  port: "5432", // PostgreSQL port
  database: "postgres", // Database name
});

// Root route (optional)
app.get("/", (req, res) => {
  res.send(
    "Welcome to the PostgreSQL data API! Visit /location, /agency, /agent, or /property to see the data."
  );
});

// Endpoint to get all data from the 'location' table
app.get("/location", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM location");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data from the location table");
  }
});

// Endpoint to get all data from the 'agency' table
app.get("/agency", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM agency");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data from the agency table");
  }
});

// Endpoint to get all data from the 'agent' table
app.get("/agent", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM agent");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data from the agent table");
  }
});

// Endpoint to get all data from the 'property' table
app.get("/property", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM property");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data from the property table");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
