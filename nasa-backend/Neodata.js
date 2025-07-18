const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY;
const POSTGRES_URL = process.env.POSTGRES_URL;

const pool = new Pool({
    connectionString: POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

async function fetchNEODataAndSave() {
    const today = new Date().toISOString().split('T')[0];

    try {
        const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
            params: {
                start_date: today,
                end_date: today,
                api_key: NASA_API_KEY
            }
        });

        const neoList = response.data.near_earth_objects[today];

        for (const neo of neoList) {
            const approach = neo.close_approach_data[0];
            const diameter = neo.estimated_diameter.kilometers.estimated_diameter_max;

            await pool.query(
                `INSERT INTO asteroids (neo_id, name, magnitude, is_hazardous, approach_date, diameter)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`, [
                    neo.id,
                    neo.name,
                    neo.absolute_magnitude_h,
                    neo.is_potentially_hazardous_asteroid,
                    approach.close_approach_date,
                    diameter
                ]
            );
        }

        console.log(`${neoList.length} asteroids saved for ${today}`);
    } catch (err) {
        console.error('Failed to fetch or save data:', err.message);
    } finally {
        pool.end();
    }
}

fetchNEODataAndSave();