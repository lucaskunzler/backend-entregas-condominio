const express = require('express');
const router = express.Router();
const { getResidents } = require('../controllers/userController');


router.get('/residents', getResidents);

module.exports = router;
