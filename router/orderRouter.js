const express = require('express')

const router = express.Router()

const cloudinary = require('cloudinary')

const{upload} = require('../middleware/multer')

const {createOrder} = require('../controller/orderController')

router.post('/order/:staffId', upload.fields([{name: 'images', maxCount: 5}]), createOrder)

module.exports = router