const express = require('express');
const router = express.Router();
const Division = require('../models/Division');

// Get all divisions
router.get('/', async (req, res) => {
  try {
    const divisions = await Division.find();
    res.send(divisions);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
