
const Delivery = require('../models/Delivery');

const createDelivery = async (req, res) => {
    try {
        const { resident, descricao } = req.body;

        //falta verificação

        const delivery = new Delivery({ resident, descricao });
        await delivery.save();

        res.status(201).json(delivery);
    } catch (error) {
        console.error("Erro ao criar entrega:", error);
        res.status(500).json({ error: 'Server error' });
    }
};


const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find()
            .populate('resident', 'nome');

        res.json(deliveries);
    } catch (error) {
        console.error("Erro ao buscar entregas:", error);
        res.status(500).json({ error: 'Server error' });
    }
};



const getDeliveriesByResident = async (req, res) => {
    try {
        // req.user.id vem do middleware
        const residentId = req.user.id;

        const deliveries = await Delivery.find({ resident: residentId })
            .populate('resident', 'nome');

        res.json(deliveries);
    } catch (error) {
        console.error("Erro ao buscar entregas do morador logado:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getDeliveriesByResident };


module.exports = { createDelivery, getDeliveries, getDeliveriesByResident };



