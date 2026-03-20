const express = require('express')

const router = express.Router()

const { createOrganization} = require('../controller/organizationController')

const cloudinary = require('cloudinary')

const {upload} = require('../middleware/multer')



router.post('/org', upload.fields([{name: 'logo'}]), createOrganization)



module.exports = router