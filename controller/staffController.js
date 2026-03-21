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
       const file = req.file.profilePhoto;
        console.log(file) 
       let outcome = [];
        const filePath = file.map((element) => element.path);
        console.log(filePath)

      const cloudFiles = filePath.map(async(element) => await cloudinary.uploader.upload(element));
    console.log(cloudFiles)

    const cloudResponses = await Promise.all(cloudFiles);
    console.log(cloudResponses)

    cloudResponses.forEach((element) => {
      const object = { secureUrl: element.secure_url, publicId: element.public_id };
      outcome.push(object);
    });
    console.log(outcome)

    await Promise.all(
      filePath.map((element) => fs.unlinkSync(element))
    );
        const {staffName, position, staffDp, salary, profilePhoto} = req.body;
        const {organizationId} = req.params; 
        const newStaff = await staffTables.create({
            staffName,
            position,
            organizationId,
            staffDp: result,
            salary,
            profilePhoto: outcome
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