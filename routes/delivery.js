const express = require('express');
const router = express.Router();
const { createDelivery, getDeliveries, getDeliveriesByResident } = require('../controllers/deliveryController');
const authMiddleware = require('../middleware/auth');

router.post('/deliveries', createDelivery);
router.get('/deliveries', getDeliveries);
router.get('/deliveries/my-deliveries', authMiddleware, getDeliveriesByResident);

module.exports = router;
