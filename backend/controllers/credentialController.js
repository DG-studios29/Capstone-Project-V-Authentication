const Credential = require('../models/Credential');
const Division = require('../models/Division');

// View credentials of a division
exports.viewCredentials = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the request
    const divisionId = req.params.id;

    // Check if the user has access to the division
    const hasAccess = req.user.divisions.includes(divisionId);
    if (!hasAccess) {
      return res.status(403).send({ error: 'Access denied' });
    }

    const division = await Division.findById(divisionId).populate('credentials');
    if (!division) {
      return res.status(404).send({ error: 'Division not found' });
    }
    res.send(division.credentials);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Add a credential to a division
exports.addCredential = async (req, res) => {
  const { name, username, password } = req.body;
  const divisionId = req.params.id;

  try {
    // Check if the user has access to the division
    const hasAccess = req.user.divisions.includes(divisionId);
    if (!hasAccess) {
      return res.status(403).send({ error: 'Access denied' });
    }

    const division = await Division.findById(divisionId);
    if (!division) {
      return res.status(404).send({ error: 'Division not found' });
    }

    const credential = new Credential({ name, username, password, division: divisionId });
    await credential.save();
    division.credentials.push(credential);
    await division.save();
    res.status(201).send(credential);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Update a specific credential
exports.updateCredential = async (req, res) => {
  const { name, username, password } = req.body;
  const credentialId = req.params.id;

  try {
    const credential = await Credential.findById(credentialId);
    if (!credential) {
      return res.status(404).send({ error: 'Credential not found' });
    }

    // Check if the user has access to the division
    const hasAccess = req.user.divisions.includes(credential.division.toString());
    if (!hasAccess) {
      return res.status(403).send({ error: 'Access denied' });
    }

    credential.name = name || credential.name;
    credential.username = username || credential.username;
    credential.password = password || credential.password;
    await credential.save();
    res.send(credential);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
