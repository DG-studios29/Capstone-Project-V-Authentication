const User = require('../models/User');
const Division = require('../models/Division');
const OU = require('../models/OU');

exports.assignDivision = async (req, res) => {
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
};

exports.assignOU = async (req, res) => {
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
};

exports.changeRole = async (req, res) => {
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
};
