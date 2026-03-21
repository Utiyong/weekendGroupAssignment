const {createStaff}=require('../controller/staffController');
const router = require('express').Router();
const {upload} = require('../middleware/multer')
  
router.post('/staff/:organizationId', upload.fields(
    [
        {name: 'staffDp', maxCount: 5},
        {name: 'profilePhoto', maxCount: 5}
    ]
), createStaff);

module.exports = router 