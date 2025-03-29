const User = require("../models/User");

exports.getUserDetails = async (req,res) => {
    try{
        const username = req.user.username;
        const userDetails = await User.findOne({username});
        if(!username){
            return res.status(403).json({
                success: false,
                message: "User is not logged in",
            })
        }
        return res.status(200).json({
            success: true,
            userDetails,
            message: "We have successfully retrieved user details",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in fetching data",
        })
    }
}