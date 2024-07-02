const User = require('../models/User');
const Division = require('../models/Division');
const OU = require('../models/OU');

// Assign user to division
exports.assignDivision = async (req, res) => {
  const { userId, divisionId } = req.body;
  try {
    // Find user and division by their IDs
    const user = await User.findById(userId);
    const division = await Division.findById(divisionId);

    // Return error if either user or division is not found
    if (!user || !division) {
      return res.status(404).send({ error: 'User or Division not found' });
    }

    // Check if user is not already in the division
    if (!user.divisions.includes(divisionId)) {
      user.divisions.push(divisionId);  // Add division to user's list
      await user.save();  // Save updated user
    }

    // Send success message
    res.send({ message: 'User assigned to division successfully' });
  } catch (err) {
    // Handle errors
    res.status(500).send({ error: err.message });
  }
};

// Assign user to OU
exports.assignOU = async (req, res) => {
  const { userId, ouId } = req.body;
  try {
    // Find user and OU by their IDs
    const user = await User.findById(userId);
    const ou = await OU.findById(ouId);

    // Return error if either user or OU is not found
    if (!user || !ou) {
      return res.status(404).send({ error: 'User or OU not found' });
    }

    // Check if user is not already in the OU
    if (!user.ous.includes(ouId)) {
      user.ous.push(ouId);  // Add OU to user's list
      await user.save();  // Save updated user
    }

    // Send success message
    res.send({ message: 'User assigned to OU successfully' });
  } catch (err) {
    // Handle errors
    res.status(500).send({ error: err.message });
  }
};

// Change user role
exports.changeRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    // Find user by ID
    const user = await User.findById(userId);

    // Return error if user is not found
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Update user role
    user.role = role;
    await user.save();  // Save updated user

    // Send success message
    res.send({ message: 'User role updated successfully' });
  } catch (err) {
    // Handle errors
    res.status(500).send({ error: err.message });
  }
};
