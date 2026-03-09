
const Delivery = require('../models/Delivery');

const createDelivery = async (req, res) => {
    try {
        const { resident, descricao } = req.body;

        if (!resident) {
            console.warn('[Delivery] Create failed - missing resident field');
            return res.status(400).json({ error: 'resident is required' });
        }

        console.log(`[Delivery] Creating delivery for resident: ${resident}`);

        const delivery = new Delivery({ resident, descricao });
        await delivery.save();

        console.log(`[Delivery] Delivery created with id: ${delivery._id}`);
        res.status(201).json(delivery);
    } catch (error) {
        console.error('[Delivery] Error creating delivery:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


const getDeliveries = async (req, res) => {
    try {
        console.log('[Delivery] Fetching all deliveries');
        const deliveries = await Delivery.find()
            .populate('resident', 'nome');

        console.log(`[Delivery] Found ${deliveries.length} deliveries`);
        res.json(deliveries);
    } catch (error) {
        console.error('[Delivery] Error fetching deliveries:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


const getDeliveriesByResident = async (req, res) => {
    try {
        const residentId = req.user.id;
        console.log(`[Delivery] Fetching deliveries for resident: ${residentId}`);

        const deliveries = await Delivery.find({ resident: residentId })
            .populate('resident', 'nome');

        console.log(`[Delivery] Found ${deliveries.length} deliveries for resident: ${residentId}`);
        res.json(deliveries);
    } catch (error) {
        console.error('[Delivery] Error fetching resident deliveries:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


const confirmDelivery = async (req, res) => {
    try {
        const { id } = req.params;
        const residentId = req.user.id;

        const delivery = await Delivery.findOneAndUpdate(
            { _id: id, resident: residentId },
            { status: 'entregue' },
            { new: true }
        );

        if (!delivery) {
            return res.status(404).json({ error: 'Entrega não encontrada' });
        }

        console.log(`[Delivery] Delivery ${id} confirmed by resident ${residentId}`);
        res.json(delivery);
    } catch (error) {
        console.error('[Delivery] Error confirming delivery:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createDelivery, getDeliveries, getDeliveriesByResident, confirmDelivery };



