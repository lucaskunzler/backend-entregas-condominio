const express = require('express');
const router = express.Router();
const { createDelivery, getDeliveries, getDeliveriesByResident, confirmDelivery } = require('../controllers/deliveryController');
const authMiddleware = require('../middleware/auth');

router.post('/deliveries', createDelivery);
router.get('/deliveries', getDeliveries);
router.get('/deliveries/my-deliveries', authMiddleware, getDeliveriesByResident);
router.patch('/deliveries/:id/confirm', authMiddleware, confirmDelivery);

module.exports = router;
