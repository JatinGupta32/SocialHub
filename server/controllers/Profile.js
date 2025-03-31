const User = require("../models/User");

exports.getUserDetails = async (req,res) => {
    try{
        
        const userid = req.user.id;
        const userDetails = await User.findById(
            userid,
            {
                username: true,
                fullname: true,
                email: true,
                contactNumber: true,
                additionalDetails: true,
                followers: true,
                following: true,
                posts: true,
                image: true,
            })
            .populate("additionalDetails followers following posts")
            .exec()
        console.log('userDetails', userDetails);
        if(!userid){
            return res.status(403).json({
                success: false,
                message: "User is not logged in",
            })
        }
        return res.status(200).json({
            success: true,
            userDetails: userDetails,
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