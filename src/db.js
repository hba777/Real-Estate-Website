// src/api/db.js

import { Pool } from "pg";

const pool = new Pool({
  user: "postgres", // Your PostgreSQL username
  password: "BestPasswordEver", // Your PostgreSQL password
  host: "34.133.41.198", // Replace with your VM/Cloud Instance IP or hostname
  port: "5432", // PostgreSQL port
  database: "postgres",
});

export default pool;
