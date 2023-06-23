const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  data: { type: Buffer, required: false }, // Dados da imagem em base64
});

module.exports = mongoose.model('Image', ImageSchema);
