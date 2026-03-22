const express = require('express')

const router = express.Router()

const { createOrganization, apisolution, getAllOrders} = require('../controller/organizationController')

const cloudinary = require('cloudinary')

const {upload} = require('../middleware/multer')



router.post('/org', upload.fields([{name: 'logo'}]), createOrganization)

router.get('/organize/:id', apisolution)
router.get('/organize/:id', getAllOrders)



module.exports = router