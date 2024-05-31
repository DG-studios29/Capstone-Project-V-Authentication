const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const credentialSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Credential = mongoose.model('Credential', credentialSchema);
module.exports = Credential;
