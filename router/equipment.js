const router = require('express').Router();

const {upload} = require('../middleware/multer')


const {createEquipment} = require('../controller/equipmentController')

const cloudinary = require('cloudinary')

router.post('/equipment/:organizationId', upload.fields(
    [
        {name:'images', maxCount: 5}
    ]
), createEquipment);

module.exports = router