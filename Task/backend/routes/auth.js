const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    console.log('User registered successfully:', user);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(400).send({ error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found:', username);
      return res.status(400).send({ error: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password mismatch for user:', username);
      return res.status(400).send({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Login successful for user:', user);
    res.send({ token, role: user.role });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
