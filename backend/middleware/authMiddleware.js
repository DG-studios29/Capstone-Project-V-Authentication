const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate users
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findById(decoded.id);  // Find user by decoded ID
    next();  // Proceed to next middleware
  } catch (err) {
    // Handle errors
    res.status(401).send({ error: 'Unauthorized' });
  }
};

// Middleware to authorize users based on their divisions
const authorize = (req, res, next) => {
  const divisionId = req.params.id || req.body.divisionId;
  // Check if user is part of the specified division
  if (!req.user.divisions.includes(divisionId)) {
    return res.status(403).send({ error: 'Forbidden' });
  }
  next();  // Proceed to next middleware
};

// Middleware to authenticate admin users
const authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id);

    // Check if user is an admin
    if (user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied' });
    }
    req.user = user;  // Attach user to request
    next();  // Proceed to next middleware
  } catch (err) {
    // Handle errors
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = {
  authenticate,
  authorize,
  authenticateAdmin,
};
