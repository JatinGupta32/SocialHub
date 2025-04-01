const User = require("../models/User");
const mongoose = require("mongoose");
exports.getUser = async (req,res) => {
    try{
        const userid = req.user.id;
        console.log("12");
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
        // console.log('userDetails1: ', userDetails);
        if(!userid){
            return res.status(403).json({
                success: false,
                message: "This user is not exist",
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

exports.getUserDetails = async (req,res) => {
    try{
        const { userid } = req.query;
        console.log("userid:", userid);
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
        const loginUserDetails = await User.findById(
            req.user.id,
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
        // console.log('userDetails: ', userDetails);
        // if(!userid){
        //     return res.status(403).json({
        //         success: false,
        //         message: "This user is not exist",
        //     })
        // }
        return res.status(200).json({
            success: true,
            userDetails: userDetails,
            loginUserDetails: loginUserDetails,
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


// exports.updateFollow = async (req,res) => {
//     try{
//         const {profileUserid} = req.body;
//         const userid = req.user.id;
//         console.log(userid,profileUserid);
//         // console.log(userid);
//         if(!userid){
//             return res.status(401).json({
//                 success: false,
//                 message: "This user does not exist",
//             })
//         }
//         // Fetch post details
//         let updatedUserDetails,updatedProfileUserDetails;
//         const userDetails = await User.findById(userid);
//         const profileUserDetails = await User.findById(profileUserid);
//         if(userDetails?.following?.includes(profileUserid)){
//             updatedUserDetails = await User.findByIdAndUpdate(
//                 userid,
//                 {
//                     $pull: {
//                         following: {
//                             $each: [profileUserid],
//                             $position: 0  // Insert at the beginning
//                         }
//                     }
//                 })
//                 .populate("additionalDetails followers following posts")
//                 .exec()
//             }
//         else{
//             updatedUserDetails = await User.findByIdAndUpdate(
//                 userid,
//                 {
//                     $push: {
//                         following: {
//                             $each: [profileUserid],
//                             $position: 0  // Insert at the beginning
//                         }
//                     }
//                 })
//                 .populate("additionalDetails followers following posts")
//                 .exec()
//         }

//         if(profileUserDetails?.followers?.includes(userid)){
//             updatedProfileUserDetails = await User.findByIdAndUpdate(
//                 profileUserid,
//                 {
//                     $pull: {
//                         followers: {
//                             $each: [userid],
//                             $position: 0  // Insert at the beginning
//                         }
//                     }
//                 })
//                 .populate("additionalDetails followers following posts")
//                 .exec()
//         }
//         else{
//             updatedProfileUserDetails = await User.findByIdAndUpdate(
//                 profileUserid,
//                 {
//                     $push: {
//                         followers: {
//                             $each: [userid],
//                             $position: 0  // Insert at the beginning
//                         }
//                     }
//                 })
//                 .populate("additionalDetails followers following posts")
//                 .exec()
//         }

//         console.log("updatedUserDetails: ", updatedUserDetails);
//         console.log("updatedProfileUserDetails: ", updatedProfileUserDetails);
//         return res.status(200).json({
//             success: true,
//             updatedUserDetails,
//             updatedProfileUserDetails,
//             message: "Follow update succesfull",
//         })
//     }
//     catch(error){
//         console.log(error)
//         return res.status(500).json({
//             success: false,
//             message: "Some error is coming while updating Follow",
//         })
//     }
// }

exports.updateFollow = async (req, res) => {
    try {
        let { profileUserid } = req.body;
        let userid = req.user.id;

        // Convert user IDs to ObjectId
        if (!mongoose.Types.ObjectId.isValid(userid) || !mongoose.Types.ObjectId.isValid(profileUserid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format",
            });
        }

        userid = new mongoose.Types.ObjectId(userid);
        profileUserid = new mongoose.Types.ObjectId(profileUserid);

        console.log(userid, profileUserid);

        if (!userid) {
            return res.status(401).json({
                success: false,
                message: "This user does not exist",
            });
        }

        let updatedUserDetails, updatedProfileUserDetails;
        const userDetails = await User.findById(userid);
        const profileUserDetails = await User.findById(profileUserid);

        if (!userDetails || !profileUserDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (userDetails.following.includes(profileUserid)) {
            updatedUserDetails = await User.findByIdAndUpdate(
                userid,
                { $pull: { following: profileUserid } },  // Directly use ObjectId
                { new: true }
            ).populate("additionalDetails followers following posts").exec();
        } else {
            updatedUserDetails = await User.findByIdAndUpdate(
                userid,
                { $push: { following: profileUserid } },
                { new: true }
            ).populate("additionalDetails followers following posts").exec();
        }

        if (profileUserDetails.followers.includes(userid)) {
            updatedProfileUserDetails = await User.findByIdAndUpdate(
                profileUserid,
                { $pull: { followers: userid } },
                { new: true }
            ).populate("additionalDetails followers following posts").exec();
        } else {
            updatedProfileUserDetails = await User.findByIdAndUpdate(
                profileUserid,
                { $push: { followers: userid } },
                { new: true }
            ).populate("additionalDetails followers following posts").exec();
        }

        console.log("updatedUserDetails: ", updatedUserDetails);
        console.log("updatedProfileUserDetails: ", updatedProfileUserDetails);

        return res.status(200).json({
            success: true,
            updatedUserDetails,
            updatedProfileUserDetails,
            message: "Follow update successful",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occurred while updating Follow",
        });
    }
};