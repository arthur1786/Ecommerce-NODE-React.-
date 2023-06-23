const mongoose = require('mongoose');

const CreditCardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  cardName: { type: String, required: true },
  cvc: { type: String, required: true },
  expirationDate: { type: String, required: true },
});

module.exports = mongoose.model('CreditCard', CreditCardSchema);
