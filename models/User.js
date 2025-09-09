const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  role: { type: String, enum: ['porteiro', 'morador'], default: 'morador' }
});

module.exports = mongoose.model('User', userSchema);