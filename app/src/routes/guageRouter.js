const express = require('express');
const router = express.Router();
const guageController = require('../controllers/guageController.js');

router.get('/guage', guageController.updateTemp);

module.exports = router;



