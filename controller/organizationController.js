const { Organization} = require('../models')

exports.createOrganization = async(req, res) =>{
    try{
        const {Logo, name, address, email, phoneNumber} = req.body

        const newOrg = await Organization.create({
            Logo, 
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

    }
}