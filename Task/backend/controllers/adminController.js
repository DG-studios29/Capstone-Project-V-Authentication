const User = require('../models/User');
const Division = require('../models/Division');

/**
 * Assign a user to a division.
 */
exports.assignUserToDivision = async (req, res) => {
  const { userId, divisionId } = req.body;

  try {
    const user = await User.findById(userId);
    const division = await Division.findById(divisionId);

    if (!user || !division) {
      return res.status(404).send({ error: 'User or Division not found' });
    }

    user.divisions.push(divisionId);
    await user.save();

    res.status(200).send({ message: 'User assigned to division successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

/**
 * Remove a user from a division.
 */
exports.removeUserFromDivision = async (req, res) => {
  const { userId, divisionId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    user.divisions = user.divisions.filter((divId) => divId.toString() !== divisionId);
    await user.save();

    res.status(200).send({ message: 'User removed from division successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
