const { staffTables } = require('../models');
const cloudinary = require('../middleware/cloudinary')
const fs = require('fs')

exports.createStaff = async(req, res) =>{
    try{

        const sDFiles = req.files.staffDp
        const profilePhotoFiles = req.files.profilePhoto

//sD stands for staffDp

        const sDfilepath = sDFiles.map((e)=>e.path)
        const proffilePath = profilePhotoFiles.map((e)=>e.path)
        console.log(sDfilepath)
        console.log(proffilePath)
        

        const sDUploadPicturetoCloudinary = sDfilepath.map((e)=>cloudinary.uploader.upload(e))
        const profilepUploadtoCloudinary = proffilePath.map((e)=>cloudinary.uploader.upload(e))
        

        const sDresponses = await Promise.all(sDUploadPicturetoCloudinary)
        const ProfResponses = await Promise.all(profilepUploadtoCloudinary)


        const sDextracturl = sDresponses.map((e)=>e.secure_url)
        const profExtracturl = ProfResponses.map((e)=>e.secure_url)


        const {staffName, position, salary} = req.body;
        const {organizationId} = req.params;

        await Promise.all(
                    sDFiles.map((e)=>{
                        fs.unlinkSync(e.path)
                        
                    })
                )

            await Promise.all(
                profilePhotoFiles.map((e)=>{
                    fs.unlinkSync(e.path)
                })

            )

        const newStaff = await staffTables.create({
            staffName,
            position,
            organizationId,
            staffDp:sDextracturl,
            salary,
            profilePhoto:profExtracturl
        });

        res.status(201).json({
            message: 'successfully created a new staff',
            data: newStaff
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ 
            message: "something went wrong",
            data: error.message
        });
    }
};