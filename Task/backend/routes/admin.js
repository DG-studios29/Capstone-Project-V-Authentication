const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Division = require('../models/Division');
const OU = require('../models/OU');

const router = express.Router();

// Middleware to verify JWT and check admin role
const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, 'your_jwt_secret', async (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const user = await User.findById(decoded.id);
    if (user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied' });
    }
    req.user = decoded;
    next();
  });
};

// Assign user to division
router.post('/assign-division', authenticateAdmin, async (req, res) => {
  const { userId, divisionId } = req.body;
  try {
    const user = await User.findById(userId);
    const division = await Division.findById(divisionId);
    if (!user || !division) {
      return res.status(404).send({ error: 'User or Division not found' });
    }
    if (!user.divisions.includes(divisionId)) {
      user.divisions.push(divisionId);
      await user.save();
    }
    res.send({ message: 'User assigned to division successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Assign user to OU
router.post('/assign-ou', authenticateAdmin, async (req, res) => {
  const { userId, ouId } = req.body;
  try {
    const user = await User.findById(userId);
    const ou = await OU.findById(ouId);
    if (!user || !ou) {
      return res.status(404).send({ error: 'User or OU not found' });
    }
    if (!user.ous.includes(ouId)) {
      user.ous.push(ouId);
      await user.save();
    }
    res.send({ message: 'User assigned to OU successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Change user role
router.post('/change-role', authenticateAdmin, async (req, res) => {
  const { userId, role } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    user.role = role;
    await user.save();
    res.send({ message: 'User role updated successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
