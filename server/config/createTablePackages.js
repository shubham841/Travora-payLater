// ✅ File: backend/database/migrations/createPackageTable.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  // connectionString: 
});

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS packages (
      id SERIAL PRIMARY KEY,
      clerk_user_id TEXT NOT NULL,
      agent_name TEXT NOT NULL,
      title TEXT,
      destination TEXT,
      category TEXT,
      duration TEXT,
      price TEXT,
      description TEXT,
      itinerary TEXT,
      inclusions TEXT,
      exclusions TEXT,
      email TEXT,
      phone TEXT,
      cover_image TEXT,
      itinerary_images TEXT[],
      is_active BOOLEAN DEFAULT TRUE,
      agency_name TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_clerk_user
        FOREIGN KEY(clerk_user_id)
        REFERENCES agents(clerk_user_id)
        ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ packages table created successfully.');
  } catch (err) {
    console.error('❌ Error creating packages table:', err);
  } finally {
    await pool.end();
  }
};

createTable();
