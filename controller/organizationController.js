const { Organization} = require('../models')
const cloudinary  = require('../middleware/cloudinary')

exports.createOrganization = async(req, res) =>{
    try{

        const files = req.files.logo
        const afilepath = files.map((photo)=>photo.path)
        console.log('this is the afilepaths log',afilepath)
        const uploadPicturetoCloudinary = afilepath.map((e)=> cloudinary.uploader.upload(e))
        console.log('this is uploadPictureTocloudinarys response', uploadPicturetoCloudinary);
        

        const uploadResponse = await Promise.all(uploadPicturetoCloudinary) 
        console.log('this is uploadResponses means', uploadResponse)
        const extraSecureurl = uploadResponse.map((e)=>e.secure_url)
        console.log('this is extraSecures own', extraSecureurl)
        const {name, address, email, phoneNumber} = req.body

        const newOrg = await Organization.create({
            logo: extraSecureurl,
            name,
            email,
            address,
            email,
            phoneNumber

        })
        res.status(201).json({
            message: 'successfully created an organization',
            data: newOrg
        })

    }
    catch(error){
        res.status(500).json({
            message: "something went wrong",
            data: error.message
        })
        console.log(error)


    }
}