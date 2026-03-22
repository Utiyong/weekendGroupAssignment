const express = require('express')
const router = express.Router();
const {createDelivery} = require('../controller/delivery')

router.post('/delivery', createDelivery);

module.exports = router