const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

router.get('/porteiro', authMiddleware, dashboardController.porteiroDashboard);
router.get('/morador', authMiddleware, dashboardController.moradorDashboard);

module.exports = router;