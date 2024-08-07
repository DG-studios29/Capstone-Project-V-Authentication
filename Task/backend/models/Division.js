const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const divisionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  credentials: [{ type: Schema.Types.ObjectId, ref: 'Credential' }],
  ou: { type: Schema.Types.ObjectId, ref: 'OU' } // Reference to OU
});

const Division = mongoose.model('Division', divisionSchema);
module.exports = Division;
