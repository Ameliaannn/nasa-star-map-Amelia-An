require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;

router.get('/', async(req, res) => {
    try {
        const queryDate = req.query.date;
        const today = new Date().toISOString().split('T')[0];

        const date = queryDate || today;

        if (date > today) {
            return res.status(400).json({ error: 'Cannot request data for a future date' });
        }

        const metadataUrl = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${NASA_API_KEY}`;

        const { data } = await axios.get(metadataUrl);

        if (!data.length) {
            return res.status(404).json({ error: 'No EPIC image available for the selected date.' });
        }

        const imageName = data[0].image;
        const imageDate = date.replaceAll('-', '/');
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${imageDate}/jpg/${imageName}.jpg`;

        res.json({ imageUrl, caption: data[0].caption, date: data[0].date });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch EPIC data' });
    }
});

module.exports = router;