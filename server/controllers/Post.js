const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment")
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config();

exports.createPost = async (req,res) => {
    try{
        const {photos,caption,music,location,tagPeople,commentAllowed,privacyStatus} = req.body;
        const userid = req.user.id;
        console.log(userid);
        if(!userid){
            return res.status(401).json({
                success: false,
                message: "This user does not exist",
            })
        }
        if(!photos){
            return res.status(400).json({
                success: false,
                message: "This user does not exist",
            })
        }
        const Photos = [];
        for (let i = 0; i < photos.length; i++) {
            if (!photos[i].startsWith("data:image")) {
                console.error("Invalid base64 format at index", i);
                continue;
            }
            try {
                let imageUrl = await uploadImageToCloudinary(photos[i], process.env.FOLDER_NAME);
                Photos.push(imageUrl.secure_url);
            } catch (error) {
                console.error("Upload failed for image", i, error);
            }
        }
        // console.log("Cloudinary_urls",Photos);
        const newPost = await Post.create({
            user: userid,
            photos: Photos, 
            caption, music, location, tagPeople, commentAllowed, privacyStatus,
            likes:[],
            comments:[],
        });
        const updatedUserDetails = await User.findByIdAndUpdate(
            userid,
            {
                $push: {
                    posts: {
                        $each: [newPost._id],
                        $position: 0  // Insert at the beginning
                    }
                }
            },
            { new: true }
        );
        // console.log(newPost, updatedUserDetails);
        return res.status(200).json({
            success: true,
            // updatedUserDetails,
            message: "New Post Created",
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Some error is coming while creating post",
        })
    }
}

exports.getPostDetails = async (req,res) => {
    try{        
        // console.log("12345",req.body);
        const { postid } = req.query;
        console.log("postid",postid);
        const postDetails = await Post.findById(postid)
        .select("user photos caption music location tagPeople commentAllowed privacyStatus date likes comments")
        .populate("user likes") 
        .populate({
            path: "comments", // Populate comments array
            populate: {
                path: "user", // Populate the user field inside each comment
                model: "user", // Ensure correct model name
                select: "username image fullname", // Fetch relevant fields
            },
        });

        // console.log('postDetails', postDetails);
        
        return res.status(200).json({
            success: true,
            postDetails: postDetails,
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

exports.updateLikeOnPost = async (req,res) => {
    try{
        const {postid} = req.body;
        const userid = req.user.id;

        // console.log(userid);
        if(!userid){
            return res.status(401).json({
                success: false,
                message: "This user does not exist",
            })
        }
        // Fetch post details
        const postdetails = await Post.findById(postid);

        if (!postdetails) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        let updatedPostDetails;
        if(postdetails.likes.includes(userid)){
            updatedPostDetails = await Post.findByIdAndUpdate(postid,
                {
                    $pull: {
                        likes: userid,
                    }
                },
                {new: true},
            ).populate("user likes") 
            .populate({
                path: "comments", // Populate comments array
                populate: {
                    path: "user", // Populate the user field inside each comment
                    model: "user", // Ensure correct model name
                    select: "username image fullname", // Fetch relevant fields
                },
            })
            .exec();
        }
        else{
            updatedPostDetails = await Post.findByIdAndUpdate(postid,
                {
                    $push: {
                        likes: {
                            $each: [userid],
                            $position: 0  // Insert at the beginning
                        }
                    }
                },
                {new: true},
            ).populate("user likes") 
            .populate({
                path: "comments", // Populate comments array
                populate: {
                    path: "user", // Populate the user field inside each comment
                    model: "user", // Ensure correct model name
                    select: "username image fullname", // Fetch relevant fields
                },
            })
            .exec();
        }

        // console.log("updatedPostDetails: ", updatedPostDetails);
        return res.status(200).json({
            success: true,
            updatedPostDetails,
            message: "Like update succesfull",
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Some error is coming while updating like",
        })
    }
}

exports.addCommentOnPost = async (req,res) => {
    try{
        const {postid, comment} = req.body;
        const userid = req.user.id;

        console.log(userid);
        if(!userid){
            return res.status(401).json({
                success: false,
                message: "This user does not exist",
            })
        }
        console.log("1");
        const commentData = await Comment.create({
            user: userid,
            post: postid,
            statement: comment,
        })
        console.log(commentData);
        const updatedPostDetails = await Post.findByIdAndUpdate(
            postid,
            {
                $push: {
                    comments: {
                        $each: [commentData._id],
                        $position: 0  // Insert at the beginning
                    }
                } // Push comment ID to post's comments array
            },
            { new: true }
        )
        .populate("user likes") 
        .populate({
            path: "comments", // Populate comments array
            populate: {
                path: "user", // Populate the user field inside each comment
                model: "user", // Ensure correct model name
                select: "username image fullname", // Fetch relevant fields
            },
        })
        .exec();
        
        console.log("updatedPostDetails: ", updatedPostDetails);
        return res.status(200).json({
            success: true,
            updatedPostDetails,
            message: "Like added succesfull",
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Some error is coming while adding comment",
        })
    }
}
