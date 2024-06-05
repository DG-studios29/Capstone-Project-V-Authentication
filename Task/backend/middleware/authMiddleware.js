const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

const authorize = (req, res, next) => {
  const divisionId = req.params.id || req.body.divisionId;
  if (!req.user.divisions.includes(divisionId)) {
    return res.status(403).send({ error: 'Forbidden' });
  }
  next();
};

const authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    if (user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = {
  authenticate,
  authorize,
  authenticateAdmin,
};
