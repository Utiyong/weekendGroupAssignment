const {equipment} = require('../models')
const cloudinary  = require('../middleware/cloudinary');
const fs = require('fs')

exports.createEquipment = async(req, res) =>{
    try{
        const files = req.files.images; 
        const filePaths = files.map((e) => e.path);
        const cloudFile = filePaths.map(async(e) => await cloudinary.uploader.upload(e));
        const cloudResponse = await Promise.all(cloudFile);
        let result = [];
        cloudResponse.forEach((e) => {
          const obj = { secureUrl: e.secure_url, publicId: e.public_id };
          result.push(obj);
        });
        await Promise.all(
          filePaths.map((e) => fs.unlinkSync(e))
        );
        const {Name, price, expiringDate, status} = req.body;
        const {organizationId} = req.params;
        const newEquipment = await equipment.create({
            Name,
            price,
            expiringDate,
            status,
            images: result,
            organizationId
        });
    res.status(201).json({
        message: 'successfully created an equipment',
        data: newEquipment
    });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "something went wrong",
        });
    }
};
