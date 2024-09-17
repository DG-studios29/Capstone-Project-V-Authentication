const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Division = require('../models/Division');

/**
 * Register a new user.
 * This function handles user registration by creating a new user with a hashed password
 * and assigning them to a division. It then saves the user to the database.
 * 
 * @param {Object} req - The request object from Express.js.
 * @param {Object} res - The response object from Express.js.
 */
exports.register = async (req, res) => {
  const { username, password, divisionId } = req.body;

  try {
    const division = await Division.findById(divisionId);
    if (!division) {
      return res.status(404).send({ error: 'Division not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role: 'normal', divisions: [divisionId] });

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

/**
 * Log in an existing user.
 * This function handles user login by verifying the provided password,
 * generating a JWT token, and returning it along with the user's role and division ID.
 * 
 * @param {Object} req - The request object from Express.js.
 * @param {Object} res - The response object from Express.js.
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, divisionId: user.divisions[0] },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.send({ token, role: user.role, divisionId: user.divisions[0] });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
