const { stafftables } = require('../models');

exports.createStaff = async(req, res) =>{
    try{
        const {staffName, position, staffDp, salary, profilePhoto} = req.body;
        const {organizationId} = req.params;
        const newStaff = await stafftables.create({
            staffName,
            position,
            organizationId,
            staffDp,
            salary,
            profilePhoto
        });
        res.status(201).json({
            message: 'successfully created a staff',
            data: newStaff
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ 
            message: "something went wrong",
        });
    }
};