const {delivery} = require('../models')

exports.createDelivery = async(req, res) =>{
    try{
        const { processBy, status, cloths} = req.body;
        const newDelivery = await delivery.create({
            processBy,
            status, 
            cloths
        })
        res.status(201).json({
            message: 'successfully created a delivery',
            data: newDelivery
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "something went wrong",
        })
    }
}