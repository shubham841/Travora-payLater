// createTable.js
import dotenv from "dotenv";
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const query = `
CREATE TABLE IF NOT EXISTS agents (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  agency_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  address TEXT NOT NULL,
  gstin TEXT NOT NULL,
  bank_account_no TEXT NOT NULL,
  ifsc TEXT NOT NULL,
  id_proof_path TEXT,
  business_cert_path TEXT,
  clerk_user_id TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);`;

pool.query(query)
  .then(() => {
    console.log("✅ Table created successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error creating table:", err.message);
    process.exit(1);
  });
