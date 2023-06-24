const mongoose = require('mongoose');

const CreditCardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: false },
  cardName: { type: String, required: false },
  cvc: { type: String, required: false },
  expirationDate: { type: String, required: false },
});

module.exports = mongoose.model('CreditCard', CreditCardSchema);
