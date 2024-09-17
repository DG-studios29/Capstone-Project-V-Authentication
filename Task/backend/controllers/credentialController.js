/**
 * Updates a specific credential.
 */
exports.updateCredential = async (req, res) => {
  const { credentialId } = req.params;
  const { name, value } = req.body;

  try {
    const credential = await Credential.findById(credentialId);
    if (!credential) {
      return res.status(404).send({ error: 'Credential not found' });
    }

    credential.name = name || credential.name;
    credential.value = value || credential.value;
    await credential.save();

    res.status(200).send({ message: 'Credential updated successfully', credential });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
