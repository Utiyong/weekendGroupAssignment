const express = require('express')

const router = express.Router()


const {upload} = require('../middleware/multer')

const cloudinary = require('cloudinary')

const { createStaff } = require('../controller/staffController')

router.post('/staff/:organizationId', upload.fields([{name:'staffDp'},{name: 'profilePhoto'}]), createStaff)

module.exports = router
