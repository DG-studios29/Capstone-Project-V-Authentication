const express = require('express');
const jwt = require('jsonwebtoken');
const Credential = require('../models/Credential');
const Division = require('../models/Division');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT and user roles
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// View credentials of a division
router.get('/division/:id', authenticate, async (req, res) => {
  try {
    const division = await Division.findById(req.params.id).populate('credentials');
    if (!division) {
      return res.status(404).send({ error: 'Division not found' });
    }
    res.send(division.credentials);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add a credential to a division
router.post('/division/:id', authenticate, async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const division = await Division.findById(req.params.id);
    if (!division) {
      return res.status(404).send({ error: 'Division not found' });
    }
    const credential = new Credential({ name, username, password });
    await credential.save();
    division.credentials.push(credential);
    await division.save();
    res.status(201).send(credential);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update a specific credential
router.put('/credential/:id', authenticate, async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const credential = await Credential.findById(req.params.id);
    if (!credential) {
      return res.status(404).send({ error: 'Credential not found' });
    }
    credential.name = name || credential.name;
    credential.username = username || credential.username;
    credential.password = password || credential.password;
    await credential.save();
    res.send(credential);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
