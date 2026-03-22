const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all clients
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clients');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;