const express = require('express')
const router = express.Router();
const {createDelivery} = require('../controller/delivery')

router.post('/delivery/:orderId', createDelivery);

module.exports = router