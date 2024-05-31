const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'normal', enum: ['normal', 'management', 'admin'] },
  ous: [{ type: Schema.Types.ObjectId, ref: 'OU' }],
  divisions: [{ type: Schema.Types.ObjectId, ref: 'Division' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
