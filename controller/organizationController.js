const { order } = require('../models')
const cloudinary = require('../middleware/cloudinary')
const fs = require('fs')
const {Organization} = require('../models')
const {staffTables} = require('../models')
const { delivery } = require('../models')
const {equipment} = require('../models')

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


        await Promise.all(
            files.map((e)=>{
                fs.unlinkSync(e.path)
                
            })
        )

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




exports.apisolution = async(req, res) =>{
    try{
        const {id} = req.params

        const newApi = await Organization.findAll({
            where: {
                id: id
            },
            attributes: ["name"],
            include: [
                {
                    model: staffTables,
                    as : "neworg",
                    attributes: ["staffName", "staffDp"]

                },
                {
                    model: equipment,
                    as:"newEqui",
                    attributes: ["Name", "images"]

                },
                {
                    model: order,
                    as:"newOrders",
                    attributes: ["Type", "images", "amount", "status"]

                },
                {
                    model: delivery,
                    as: 'newDelivery',
                    attributes: ["processBy"]

                },
                   ]
        })
        res.status(200).json({
            message:"gotten the unique api",
            data: newApi
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