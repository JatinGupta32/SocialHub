const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment")
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const Notification = require("../models/Notification");
require('dotenv').config();
const cloudinary = require("cloudinary").v2;

exports.createPost = async (req,res) => {
    try{
        const {photos,caption,music,location,tagPeople,commentAllowed,privacyStatus} = req.body;
        const userid = req.user.id;
        // console.log(userid);
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
        ).populate("additionalDetails followers following posts notifications")
        .populate({
            path: "notifications",
            populate: {
            path: "sender",
            select: "username image"
            }
        })
        .exec();
        // console.log(newPost, updatedUserDetails);
        return res.status(200).json({
            success: true,
            updatedUserDetails,
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
        // console.log("postid",postid);
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
        // console.log("postdetails:" , postdetails.user._id);
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
            const notification = await Notification.create(
                { 
                    sender: userid,
                    message: "liked",
                    photo: updatedPostDetails.photos[0], 
                },
            )
            const updatedUserDetails = await User.findByIdAndUpdate(
                postdetails.user._id,
                { $push: {
                    notifications: {
                        $each: [notification._id],
                        $position: 0  // Insert at the beginning
                    },
                }},
                { new: true }
            )
            // console.log("user: ", updatedUserDetails)

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

        // console.log(userid);
        if(!userid){
            return res.status(401).json({
                success: false,
                message: "This user does not exist",
            })
        }
        const commentData = await Comment.create({
            user: userid,
            post: postid,
            statement: comment,
        })
        // console.log(commentData);
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

        const notification = await Notification.create(
                { 
                    sender: userid,
                    message: comment,
                    photo: updatedPostDetails.photos[0], 
                },
            )
            // console.log("notification: ", notification)
        const updatedUserDetails = await User.findByIdAndUpdate(
            updatedPostDetails.user._id,
            { $push: {
                notifications: {
                    $each: [notification._id],
                    $position: 0  // Insert at the beginning
                },
            }},
            { new: true }
        )
        
        // console.log("updatedPostDetails: ", updatedUserDetails);
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

exports.getSocialPosts = async (req, res) => {
    try {
        const userid = req.user?.id;
        // console.log("Userid:", userid);

        if (!userid) {
            return res.status(403).json({
                success: false,
                message: "User does not exist",
            });
        }

        // Step 1: Find user and get following list
        const user = await User.findById(userid).select("following");
        // console.log("User found:", user);

        if (!user || !Array.isArray(user.following) || user.following.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found or not following anyone",
            });
        }

        // Step 2: Fetch and sort posts
        const posts = await Post.find({ user: { $in: user.following } })
            .populate("user", "username fullname image")
            .populate("comments likes")
            // .populate("likes")
            .sort({ date: -1 })
            .lean()
            .exec();

        // console.log("Posts Found:", posts.length);
        const userDetails = await User.findById(userid,{password:false})
        .populate({
            path: "notifications",
            populate: {
            path: "sender",
            select: "username image"
            }
        });
        return res.status(200).json({
            success: true,
            postDetails: posts,
            userDetails: userDetails,
            message: "Successfully retrieved home posts details",
        });

    } catch (error) {
        console.error("Error fetching home posts:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching data",
        });
    }
};


exports.editPost = async (req, res) => {
    try {        
        const { photos, caption, music, location, tagPeople, commentAllowed, privacyStatus, postid } = req.body;
        const userid = req.user.id;
        
        // Ensure `photos` is always an array
        const Photos = Array.isArray(photos) ? [...photos] : [];
        
        for (let i = 0; i < Photos.length; i++) {
            if (!Photos[i].startsWith("data:image") && !Photos[i].startsWith("https://res.cloudinary.com")) {
                console.error("Invalid format at index", i);
                continue;
            }
            try {
                if (!Photos[i].startsWith("https://res.cloudinary.com")) {
                    let imageUrl = await uploadImageToCloudinary(Photos[i], process.env.FOLDER_NAME);
                    Photos[i] = imageUrl.secure_url;
                }
            } catch (error) {
                console.error("Upload failed for image", i, error);
            }
        }

        // Update post
        const updatedPost = await Post.findByIdAndUpdate(
            postid,
            { photos: Photos, caption, music, location, tagPeople, commentAllowed, privacyStatus },
            { new: true }
        );

        const updatedUserDetails = await User.findById(userid)
            .populate("additionalDetails followers following posts")
            .exec();

        return res.status(200).json({
            success: true,
            updatedUserDetails,
            updatedPost,
            message: "Post edited successfully!",
        });

    } catch (error) {
        console.error("Error in updating post:", error);
        return res.status(500).json({
            success: false,
            message: "Error in editing post",
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { postid } = req.body;
        const userid = req.user.id;
        // console.log("postid: ", postid)
        // Check if post exists
        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found!",
            });
        }

        // Delete images from Cloudinary (if any)
        for (const photo of post.photos) {
            if (photo.startsWith("https://res.cloudinary.com")) {
                const publicId = photo.split("/").pop().split(".")[0]; // Extract public ID
                await cloudinary.uploader.destroy(publicId);
            }
        }

        // Delete post from database
        await Post.findByIdAndDelete(postid);

        // Remove post ID from user's posts array
        const updatedUserDetails = await User.findByIdAndUpdate(
            userid,
            { $pull: { posts: postid } },
            { new: true }
        ).populate("additionalDetails followers following posts");

        return res.status(200).json({
            success: true,
            updatedUserDetails,
            message: "Post deleted successfully!",
        });

    } catch (error) {
        console.error("Error in deleting post:", error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting post",
        });
    }
};
