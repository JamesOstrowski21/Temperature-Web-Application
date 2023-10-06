const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController.js');

router.get('/table', tableController.viewTable);

//router.post('/table', tableController.deleteUser);


module.exports = router;



