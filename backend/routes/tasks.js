const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get tasks for a client
router.get('/:client_id', async (req, res) => {
    const { client_id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE client_id = $1',
            [client_id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Create task
router.post('/', async (req, res) => {
    const { client_id, title, description, category, due_date, status, priority } = req.body;

    if (!title || !due_date) {
        return res.status(400).json({ error: 'Title and due date required' });
    }

    try {
        await pool.query(
            `INSERT INTO tasks 
            (client_id, title, description, category, due_date, status, priority)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [client_id, title, description, category, due_date, status, priority]
        );

        res.json({ message: 'Task added' });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Update task status
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await pool.query(
            'UPDATE tasks SET status = $1 WHERE id = $2',
            [status, id]
        );
        res.json({ message: 'Status updated' });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;