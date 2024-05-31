const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ouSchema = new Schema({
  name: { type: String, required: true, unique: true },
  divisions: [{ type: Schema.Types.ObjectId, ref: 'Division' }],
});

const OU = mongoose.model('OU', ouSchema);
module.exports = OU;
