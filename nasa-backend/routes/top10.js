const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async(req, res) => {
    try {
        const result = await pool.query(`
  SELECT
    neo_id,
    name,
    diameter,
    TO_CHAR(approach_date, 'YYYY-MM-DD') AS approach_date
  FROM asteroids
  WHERE approach_date BETWEEN CURRENT_DATE - INTERVAL '6 days' AND CURRENT_DATE
  ORDER BY diameter DESC
  LIMIT 10
`);


        res.json(result.rows);
    } catch (error) {
        console.error('Top10 DB fetch error:', error.message);
        res.status(500).json({ error: 'Failed to fetch Top 10 asteroids' });
    }
});

module.exports = router;