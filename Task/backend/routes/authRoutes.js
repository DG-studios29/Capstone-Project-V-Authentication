const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');  // Ensure correct path

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
