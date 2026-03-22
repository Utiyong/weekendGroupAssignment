const { order } = require('../models')
const cloudinary = require('../middleware/cloudinary')
const fs = require('fs')
const {Organization} = require('../models')
const {staffTables} = require('../models')
const { delivery } = require('../models')
const {equipment} = require('../models')
const organization = require('../models/organization')

exports.createOrder = async(req, res) =>{
    try{
         const {staffId} = req.params
        const {Type, images, amount, status } = req.body

        const orderfile = req.files.images
        const alfilepath = orderfile.map((e)=>e.path)
        console.log(alfilepath) 
        const uploadTocloudinary = alfilepath.map((e)=>cloudinary.uploader.upload(e))
        console.log(uploadTocloudinary)

        const uploadResponse = await Promise.all(uploadTocloudinary)

        const extracturl = uploadResponse.map((e)=>e.secure_url)

        const newStaff = await staffTables.findByPk(staffId)
        console.log(newStaff, 'this is the new staff response')

        
        const tstaff = newStaff.staffName
        console.log(tstaff, 'this is tstaff');

        const tOrg = newStaff.organizationId

        await Promise.all(
                orderfile.map((e)=>{
                         fs.unlinkSync(e.path)
                                
                     })
                )
        


       

        const newOrder = await order.create({
            Type,
            images: extracturl,
            amount,
            status,
            staff: tstaff,
            staffId,
            organizationId: tOrg
        })
        res.status(201).json({
            message: 'successfully created a new order',
            data: newOrder
           
        })

    
    }
    catch(error){
        res.status(500).json({
            message: 'something went wrong',
            data: error.message
        })
        console.log(error)
    }
}

