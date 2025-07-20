const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS asteroids (
    id SERIAL PRIMARY KEY,
    neo_id VARCHAR(50),
    name VARCHAR(100),
    magnitude FLOAT,
    is_hazardous BOOLEAN,
    approach_date DATE,
    diameter FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(createTableQuery)
    .then(() => {
        console.log('Table "asteroids" created successfully.');
        pool.end();
    })
    .catch((err) => {
        console.error('Error creating table:', err);
        pool.end();
    });