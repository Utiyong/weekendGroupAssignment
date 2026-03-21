const { staffTables } = require('../models');
const cloudinary  = require('../middleware/cloudinary')
const fs = require('fs')

exports.createStaff = async(req, res) =>{
    try{
         const files = req.files.staffDp;
        console.log(files) 
       let result = [];
        const filePaths = files.map((e) => e.path);
        console.log(filePaths)

      const cloudFile = filePaths.map(async(e) => await cloudinary.uploader.upload(e));
    console.log(cloudFile)

    const cloudResponse = await Promise.all(cloudFile);
    console.log(cloudResponse)

    cloudResponse.forEach((e) => {
      const obj = { secureUrl: e.secure_url, publicId: e.public_id };
      result.push(obj);
    });
    console.log(result)

    await Promise.all(
      filePaths.map((e) => fs.unlinkSync(e))
    );
       
        const {staffName, position, staffDp, salary} = req.body;
        const {organizationId} = req.params; 
        const newStaff = await staffTables.create({ 
            staffName,
            position,
            organizationId,
            staffDp: result,
            salary
        
        });
        res.status(201).json({
            message: 'successfully created a staff',
            data: newStaff
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: "something went wrong",
        });
    }
};