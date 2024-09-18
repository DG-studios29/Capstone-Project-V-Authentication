const Credential = require('../models/Credential');
const Division = require('../models/Division');

/**
 * Fetches all credentials for a specific division.
 */
exports.getCredentialsByDivision = async (req, res) => {
  const { divisionId } = req.params;

  try {
    const credentials = await Credential.find({ division: divisionId });
    if (!credentials || credentials.length === 0) {
      return res.status(404).send({ error: 'No credentials found for this division' });
    }
    res.send(credentials);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
