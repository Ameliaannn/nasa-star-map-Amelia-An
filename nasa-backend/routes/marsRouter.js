const express = require('express');
const axios = require('axios');
const router = express.Router();

require('dotenv').config();
const NASA_API_KEY = process.env.NASA_API_KEY;

// GET /api/mars/photos
router.get('/photos', async(req, res) => {
    try {
        const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
            params: {
                sol: 1000,
                api_key: NASA_API_KEY
            }
        });
        const photos = response.data.photos.filter(p => p.img_src).slice(0, 3);
        res.json(photos);
    } catch (error) {
        console.error('Failed to get Mars photo.', error.message);
        res.status(500).json({ error: 'Failed to get Mars photo.' });
    }
});

// GET /api/mars/info
router.get('/info', (req, res) => {
    res.json({
        name: 'Mars',
        description: 'Mars is the fourth planet from the Sun in our solar system. It appears red due to iron oxide on its surface and is a major focus of space exploration.',
        fact: 'One day on Mars lasts about 24.6 Earth hours, and one year is approximately 687 Earth days.',
        atmosphere: 'Mars has a thin atmosphere composed primarily of carbon dioxide, with traces of nitrogen and argon.'
    });
});

module.exports = router;