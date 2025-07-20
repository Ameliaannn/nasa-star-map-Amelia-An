const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async(req, res) => {
    const date = req.query.date;

    if (!date) {
        return res.status(400).json({ error: 'Missing date parameter' });
    }

    try {
        const result = await pool.query(
            `SELECT
  neo_id,
  name,
  magnitude,
  is_hazardous,
  TO_CHAR(approach_date, 'YYYY-MM-DD') AS approach_date
FROM asteroids
WHERE approach_date = $1
ORDER BY magnitude ASC`, [date]
        );
        console.log('Fetching from DATABASE!');

        res.json(result.rows);
    } catch (error) {
        console.error('DB fetch error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from database' });
    }
});

module.exports = router;