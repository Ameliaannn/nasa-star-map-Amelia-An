require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;


router.get('/', async(req, res) => {
    try {
        const date = req.query.date || '2025-06-29';
        const metadataUrl = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${NASA_API_KEY}`;

        const { data } = await axios.get(metadataUrl);

        if (!data.length) {
            return res.status(404).json({ error: 'No image data found for this date' });
        }

        const imageName = data[0].image;
        const imageDate = date.replaceAll('-', '/');
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${imageDate}/jpg/${imageName}.jpg`;

        res.json({ imageUrl, caption: data[0].caption, date: data[0].date });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch EPIC data' });
    }
});

module.exports = router;