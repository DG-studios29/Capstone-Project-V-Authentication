const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.send({ token, role: user.role });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
