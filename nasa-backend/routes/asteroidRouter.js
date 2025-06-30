const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const NASA_API_KEY = process.env.NASA_API_KEY;

router.get('/asteroids', async(req, res) => {
    const today = new Date().toISOString().split('T')[0];
    try {
        const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
            params: {
                start_date: today,
                end_date: today,
                api_key: NASA_API_KEY,
            }
        });

        const data = response.data.near_earth_objects[today];
        res.json(data);
    } catch (error) {
        console.error('Failed to fetch asteroid data:', error.message);
        res.status(500).json({ error: 'Failed to fetch asteroid data' });
    }
});

module.exports = router;
