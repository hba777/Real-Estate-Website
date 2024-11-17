// src/api/agent.js

import pool from "../../utils/db";

// Function to get all data from the agent table
export const getAgents = async () => {
  const result = await pool.query("SELECT * FROM agent");
  return result.rows;
};

// Endpoint function for handling GET requests
export const agentHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const agents = await getAgents();
      res.status(200).json(agents);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error retrieving data from the agent table" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
