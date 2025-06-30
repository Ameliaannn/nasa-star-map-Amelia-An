const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
//get key
const NASA_API_KEY = process.env.NASA_API_KEY;

// API（APOD）
router.get('/apod', async(req, res) => {
    try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: { api_key: NASA_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Failed to get NASA data:', error.message);
        res.status(500).json({ error: 'Failed to get NASA data' });
    }
});

module.exports = router;