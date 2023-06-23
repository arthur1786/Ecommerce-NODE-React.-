const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  cpf: { type: String, required: true },
  profilePhoto: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
  creditCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CreditCard' }],
});

module.exports = mongoose.model('User', UserSchema);
