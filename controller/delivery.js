const {delivery} = require('../models')
const {staffTables} = require('../models');
const {order} = require('../models')

exports.createDelivery = async(req, res) =>{
    try{
        const {orderId} = req.params
        const {status, clothes} = req.body;

        const foundOrder = await order.findByPk(orderId)

        const newstaffId = foundOrder.staffId

        const newOrgan = foundOrder.organizationId
        

        const newstaff = await staffTables.findByPk(newstaffId)
        const finalstaffvalue = newstaff.staffName;

        // const newOrg = await staffTables.findByPk(organizationId)
        // const foundNewOrg = newOrg.organizationId

    
     
        const newDelivery = await delivery.create({
            processBy: finalstaffvalue,
            status, 
            clothes,
            staffId: newstaffId,
            organizationId: newOrgan,
            orderId,

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