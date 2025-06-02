const { default: mongoose } = require("mongoose");
const GroupChat = require("../models/GroupChat");
const PrivateChat = require("../models/PrivateChat");
const User = require("../models/User");
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const cloudinary = require("cloudinary");
require('dotenv').config();


exports.createGroup = async (req, res) => {
    try {
        const { users,groupName } = req.body;

        let userIds = [], usernames = [];

        for (let i = 0; i < users.length; i++) {
            userIds[i] = users[i]._id;
            usernames[i] = users[i].username;
        }
        usernames[users.length] = req.user.username;
        userIds[users.length] = req.user.id;


        // Generate consistent roomId from sorted usernames
        const sorted = [...usernames].sort();
        const combined = sorted.join(',');
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = (hash << 5) - hash + combined.charCodeAt(i);
            hash |= 0;
        }
        const roomId = Math.abs(hash).toString(36);

        // Create the group
        const group = await GroupChat.create({
            roomId: roomId,
            users: userIds,
            groupName: groupName,
            // groupPhoto: null,
        });

        console.log(group);

        return res.status(200).json({
            success: true,
            message: "Group created successfully",
            roomId: roomId,
            group,
        });

    } catch (error) {
        console.error("Error creating group:", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating group",
        });
    }
}

exports.createPrivateChat = async (req, res) => {
    try {
        const usr = req.body.users;
        const username = req.user.username;

        let updatedUserDetails1 = await User.findById(req.user.id)
        .select("username fullname privateChats")
        .lean()
        .populate({
            path: "privateChats",
            select: "roomId users",
            populate: {
                path: "users",
                model: "user",
                select: "username fullname image", 
            },
        })
        const chatExists = updatedUserDetails1.privateChats.some((privatechat) =>
            privatechat.users.some((u) => u._id.toString() === usr[0]._id.toString())
        );
        
        if (chatExists) {
            console.log("1234");
          return res.status(200).json({
            success: true,
            message: "Private Chat already exists",
            updatedUserDetails1,
          });
        }
        // Generate consistent roomId from sorted usernames
        const sorted = [usr[0].username, username].sort();
        const combined = sorted.join(',');
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = (hash << 5) - hash + combined.charCodeAt(i);
            hash |= 0;
        }
        const roomId = Math.abs(hash).toString(36);

        const privatechat = await PrivateChat.create({
            roomId: roomId,
            users: [usr[0]._id,req.user.id],
        });

        // console.log(privatechat);
        updatedUserDetails1 = await User.findByIdAndUpdate(req.user.id,
                {
                    $push: {
                        privateChats: privatechat._id,
                    }
                },
                {new: true},
            ).select("username fullname privateChats")
            .lean()
            .populate({
                path: "privateChats",
                select: "roomId users",
                populate: {
                    path: "users",
                    model: "user",
                    select: "username fullname image", 
                },
            })
        updatedUserDetails2 = await User.findByIdAndUpdate(usr[0]._id,
            {
                $push: {
                    privateChats: privatechat._id,
                }
            },
            {new: true},
        )

        return res.status(200).json({
            success: true,
            message: "Private Chat created successfully",
            updatedUserDetails1
        });

    } catch (error) {
        console.error("Error creating Private Chat:", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating group",
        });
    }
}

exports.getGroups = async (req, res) => {
    try {
        const userid = req.user.id;
        console.log(req.user.id);
        const groups = await GroupChat.find({
            users: userid
          })
          .populate("messages")
          .populate({
            path: "users",
            select: "image fullname"
          });

        // console.log(groups);

        return res.status(200).json({
            success: true,
            groups,
            message: "Group retreived successfully",
        });

    } catch (error) {
        console.error("Error retreiveing group:", error);
        return res.status(500).json({
            success: false,
            message: "Error in retreiving group",
        });
    }
}

exports.getUser1 = async (req, res) => {
    try {
        const userid = req.user.id;
        console.log(userid);
      
        const userDetail = await User.findById(userid)
        .select("username fullname privateChats following notifications")  // Fixed typo: "notification" -> "notifications"
        .populate({
            path: "notifications",
            populate: {
            path: "sender",
            select: "username image"
            }
        })
        .populate({
            path: "privateChats",
            select: "roomId users",
            populate: {
            path: "users",
            model: "user",
            select: "username fullname image",
            },
        })
        // .populate({
        //     path: "following",
        //     select: "username image",
        // })
        .lean();
      
        if (!userDetail) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
      
        return res.status(200).json({
          success: true,
          userDetail,
          message: "User retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
    }
}

exports.getGroupMessage = async (req,res) => {
    try{        
        const {groupId} = req.query;
        console.log("groupId: ",groupId)
        const groupMessage = await GroupChat.findById(groupId)
        .populate("users", "username fullname image") // You can select here too
        .populate({
            path: "messages",
            populate: {
                path: "sender",
                model: "user",
                select: "image fullname",
            },
        });
        // console.log(groupMessage);
        
        return res.status(200).json({
            success: true,
            groupMessage,
            message: "We have successfully retrieved group messages",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in fetching group messages",
        })
    }
}

exports.getPrivateMessage = async (req,res) => {
    try{        
        const {privateId} = req.query;
        console.log("privateId: ",privateId)
        const privateMessage = await PrivateChat.findById(privateId)
        .populate("users", "username fullname image") // You can select here too
        .populate({
            path: "messages",
            populate: {
                path: "sender",
                model: "user",
                select: "image fullname",
            },
        });
        // console.log(privateMessage);
        
        return res.status(200).json({
            success: true,
            privateMessage,
            message: "We have successfully retrieved private messages",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in fetching private messages",
        })
    }
}

exports.saveGroupPhoto = async (req, res) => {
    try {
        const groupId = req.body.groupId;
        const imageFile = req.file; // multer parses this

        const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`;

        const group = await GroupChat.findById(groupId);
        const previousPublicId = group.groupPhotoPublicId;

        // Delete previous photo from Cloudinary (if exists)
        if (previousPublicId) {
            await cloudinary.uploader.destroy(previousPublicId);
        }

        const result = await uploadImageToCloudinary(base64Image, process.env.FOLDER_NAME);

        const groupMessage = await GroupChat.findByIdAndUpdate(groupId,
            {
                groupPhoto: result.secure_url,
                groupPhotoPublicId: result.public_id,
            },
            {new: true},
        )
        .populate("users", "username fullname image") 
        .populate({
            path: "messages",
            populate: {
                path: "sender",
                model: "user",
                select: "image fullname",
            },
        });
        console.log(groupMessage);

        return res.status(200).json({
            success: true,
            message: "Group Photo saved successfully",
            groupMessage,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Save Group Photo",
        });
    }
}

exports.saveGroupName = async (req, res) => {
    try {
        const {groupId,groupName} = req.body;

        const groupMessage = await GroupChat.findByIdAndUpdate(groupId,
            {
                groupName: groupName,
            },
            {new: true},
        )
        .populate("users", "username fullname image") 
        .populate({
            path: "messages",
            populate: {
                path: "sender",
                model: "user",
                select: "image fullname",
            },
        });
        console.log(groupMessage);

        return res.status(200).json({
            success: true,
            message: "groupName saved successfully",
            groupMessage,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Save groupName",
        });
    }
}
