const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    descricao: String,
    resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dataEntrega: { type: Date, default: Date.now },
    status: { type: String, enum: ['pendente', 'entregue'], default: 'pendente' }
});

module.exports = mongoose.model('Delivery', deliverySchema);