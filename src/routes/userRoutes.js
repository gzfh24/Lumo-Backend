const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/create', async (req, res) => {
    const { username, email, avatar_url, birth_date } = req.body;
    
    try {
        // Validate required fields
        if (!username || !email || !birth_date) {
            return res.status(400).json({ error: 'Username, email, and birth date are required' });
        }

        // SQL query to insert new user
        const query = `
            INSERT INTO users (username, email, avatar_url, birth_date, created_at)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING *
        `;
        
        const values = [username, email, avatar_url, birth_date];
        
        const result = await db.query(query, values);
        
        res.status(201).json({
            message: 'User created successfully',
            user: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === '23505') { // Unique violation error code in PostgreSQL
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;