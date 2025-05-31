const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const cloudinary = require("cloudinary");
const Notification = require("../models/Notification");

exports.getUserDetails = async (req,res) => {
    try{
        const { userid } = req.query;
        // console.log("userid:", userid);
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
                privacyStatus: true,
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
                privacyStatus: true,
                notifications: true,
                requested: true,
            })
            .populate("additionalDetails followers following posts notifications")
            .populate({
                path: "notifications",
                populate: {
                path: "sender",
                select: "username image"
            }
        })
            .exec()
        
        // console.log("loginUserDetails: ",loginUserDetails)

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


exports.getUser = async (req,res) => {
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
                privacyStatus: true,
                notifications: true,
                requested: true,
            })
            .populate("additionalDetails followers following posts notifications")
            .populate({
                path: "notifications",
                populate: {
                path: "sender",
                select: "username image"
            }
        })
            .exec()
        console.log('userDetails1: ', userDetails);
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

exports.updateFollow = async (req, res) => {
    try {
        let { profileUserid } = req.body;
        let userid = req.user.id;
        // console.log(profileUserid);

        // Convert user IDs to ObjectId
        if (!mongoose.Types.ObjectId.isValid(userid) || !mongoose.Types.ObjectId.isValid(profileUserid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format",
            });
        }

        userid = new mongoose.Types.ObjectId(userid);
        profileUserid = new mongoose.Types.ObjectId(profileUserid);

        // console.log(userid, profileUserid);

        if (!userid) {
            return res.status(401).json({
                success: false,
                message: "This user does not exist",
            });
        }

        let updatedUserDetails, updatedProfileUserDetails;
        const userDetails = await User.findById(userid);
        const profileUserDetails = await User.findById(profileUserid);
        console.log("userDetails: ",userDetails)
        console.log("profileUserDetails: ",profileUserDetails)

        if (!userDetails || !profileUserDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (userDetails.following.includes(profileUserid)) {
            updatedUserDetails = await User.findByIdAndUpdate(
                userid,
                { $pull: { following: profileUserid } },  // Directly use ObjectId
                { new: true }
            ).populate("additionalDetails followers following posts requested").exec();
        } else {
            if(profileUserDetails.privacyStatus === "public"){
                updatedUserDetails = await User.findByIdAndUpdate(
                    userid,
                    { $push: {
                        following: profileUserid,
                    }},
                    { new: true }
                ).populate("additionalDetails followers following posts notifications requested")
                .populate({
                    path: "notifications",
                    populate: {
                    path: "sender",
                    select: "username image"
                    }
                })
                .exec();
            }
            else{
                updatedUserDetails = await User.findByIdAndUpdate(
                    userid,
                    { $push: {
                        requested: profileUserid,
                    }},
                    { new: true }
                ).populate("additionalDetails followers following posts notifications requested")
                .populate({
                    path: "notifications",
                    populate: {
                    path: "sender",
                    select: "username image"
                    }
                })
                .exec();
            }
        }

        if (profileUserDetails.followers.includes(userid)) {
            updatedProfileUserDetails = await User.findByIdAndUpdate(
                profileUserid,
                { $pull: { followers: userid } },
                { new: true }
            ).populate("additionalDetails followers following posts").exec();
        } else {
            let msg = profileUserDetails.privacyStatus === "public" ? "started" : "requested";
            const notification = await Notification.create(
                { 
                    sender: userid,
                    message: msg,
                },
            )
            // console.log("notification: ", notification)
            if(profileUserDetails.privacyStatus === "public"){
                updatedProfileUserDetails = await User.findByIdAndUpdate(
                    profileUserid,
                    { $push: { 
                        followers: userid,
                        notifications: {
                            $each: [notification._id],
                            $position: 0  // Insert at the beginning
                        },
                    } },
                    { new: true }
                ).populate("additionalDetails followers following posts")
                .exec();
            }
            else{
                updatedProfileUserDetails = await User.findByIdAndUpdate(
                    profileUserid,
                    { $push: { 
                        notifications: {
                            $each: [notification._id],
                            $position: 0  // Insert at the beginning
                        },
                    } },
                    { new: true }
                ).populate("additionalDetails followers following posts")
                .exec();
            }
            
        }

        console.log("updatedUserDetails: ",updatedUserDetails)
        console.log("updatedProfileUserDetails: ",updatedProfileUserDetails)

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

exports.acceptFollowRequest = async (req, res) => {
    try {
        let { followerid,notificationId } = req.body;
        let userid = req.user.id;

        // userid = new mongoose.Types.ObjectId(userid);
        // profileUserid = new mongoose.Types.ObjectId(profileUserid);

        // console.log(userid, profileUserid);

        if (!userid) {
            return res.status(401).json({
                success: false,
                message: "This user does not exist",
            });
        }

        await Notification.findByIdAndDelete(notificationId);

        const notification1 = await Notification.create(
            { 
                sender: userid,
                message: "accepted",
            },
        )
        const updatedFollowerDetails = await User.findByIdAndUpdate(
            followerid,
            { 
                $push: {
                    following: userid,
                    notifications: {
                        $each: [notification1._id],
                        $position: 0  // Insert at the beginning
                    },
                },
                $pull: {
                    requested: userid,
                },        
            },
            { new: true }
        )

        const notification2 = await Notification.create(
            { 
                sender: followerid,
                message: "started",
            },
        )
        updatedUserDetails = await User.findByIdAndUpdate(
            userid,
            { $push: { 
                followers: followerid,
                notifications: {
                    $each: [notification2._id],
                    $position: 0  // Insert at the beginning
                },
            } },
            { new: true }
        ).populate("additionalDetails followers following posts requested")
        .populate({
            path: "notifications",
            populate: {
            path: "sender",
            select: "username image"
            }
        })
        .exec();

        return res.status(200).json({
            success: true,
            updatedUserDetails,
            message: "Accepted follow request successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occurred while accepting Follow request",
        });
    }
};

exports.editProfile = async (req, res) => {
    try {        
        const {username, fullname, bio, image, gender, dateOfBirth, privacyStatus} = req.body;
        console.log("privacyStatus: ", privacyStatus);
        const userid = req.user.id;
        
        // Find user by ID
        const userdetail = await User.findById(userid);
        if (!userdetail) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find and update Profile (using additionalDetails reference)
        const updatedProfile = await Profile.findByIdAndUpdate(
            userdetail.additionalDetails,  // Directly pass the ObjectId
            {
                gender: gender,
                bio: bio,
                dateOfBirth: dateOfBirth,
            },
            { new: true }
        );

        let imageUrl = userdetail?.image;
        try {
            if(image && userdetail?.image!==image){
                imageUrl = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
            }
        }
        catch (error) {
            console.error("Upload failed for image", error);
        }
        console.log("imageUrl: ",imageUrl.secure_url);
        const updatedUserDetails = await User.findByIdAndUpdate(
            userid,
            {
                username: username,
                fullname: fullname,
                image: imageUrl.secure_url,
                privacyStatus: privacyStatus,
            },
            { new: true }
        ).populate("additionalDetails followers following posts requested")
        .populate({
            path: "notifications",
            populate: {
            path: "sender",
            select: "username image"
            }
        })
        .exec();

        return res.status(200).json({
            success: true,
            updatedUserDetails,
            // updatedProfile,  // Include updated profile
            message: "We have successfully updated the user profile",
        });
    } catch (error) {
        console.error("Error in fetching data:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating profile",
        });
    }
};


exports.getUnfollowUser = async (req, res) => {
    try {        
        const userid = req.user.id;
        console.log("userid", userid);

        // Await user details
        const userDetails = await User.findById(userid);

        // Check if user exists
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Extract followed user IDs
        const followedUsers = userDetails.following.map(user => user._id);
        followedUsers.push(userid)

        // Await the Post.find() query
        const unFollowedUsers = await User.find({ _id: { $nin: followedUsers } });

        // console.log("unFollowedUsers: ", unFollowedUsers);

        return res.status(200).json({
            success: true,
            unFollowedUsers,
            message: "We have successfully retrieved unfollowed users",
        });
    } catch (error) {
        console.error("Error in fetching data:", error);
        return res.status(500).json({
            success: false,
            message: "Error in retrieving unfollowed users",
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {        
        // Await user details
        const userDetails = await User.find();

        return res.status(200).json({
            success: true,
            userDetails,
            message: "We have successfully retrieved users",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in retrieving users",
        });
    }
};