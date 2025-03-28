const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/create', UserController.createUser, (req, res) => {
    res.status(201).json({ message: 'User created successfully', user: res.locals.newUser });
});

module.exports = router;