const Post = require("../models/Post");
const { post } = require("../routes/user");
const User = require("../models/User");


exports.createPost = async (req,res) => {
    try{
        const {username,photos,caption,music,location,tagPeople,commentAllowed,privacyStatus} = req.body;
        if(!username){
            return res.status(401).json({
                success: true,
                message: "This user does not exist",
            })
        }
        if(!photos){
            return res.status(400).json({
                success: true,
                message: "This user does not exist",
            })
        }
        const userDetails = await User.findOne({username});
        
        const newPost = await Post.create({
            user: userDetails._id,
            photos, caption, music, location, tagPeople, commentAllowed, privacyStatus,
            likes:[],
            comments:[],
        });
        const updatedUserDetails = await User.findOneAndUpdate(
            {username},
            {
                $push: {
                    posts: newPost._id,
                }
            },
            {new: true}
        )
        // console.log(newPost, updatedUserDetails);
        return res.status(200).json({
            success: true,
            message: "New Post Created",
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Some error is coming while creating post",
        })
    }
}

exports.getUserPosts = async(req,res) =>{
    try{
        const userid = req.user.id;
        console.log(userid);
        if(!userid){
            return res.status(401).json({
                success: true,
                message: "This user does not exist",
            })
        }
        
        const posts = await Post.find(
            {user: userid},
            {
                user: true,
                photos: true, caption: true, music: true, location: true, 
                tagPeople: true, commentAllowed: true, privacyStatus: true,
                likes: true,
                comments: true,
            })
            .populate("user")
            .exec()
        

        console.log(posts);
        return res.status(200).json({
            success: true,
            posts,
            message: "Fetched user's posts successfully",
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Some error is coming while fetching user posts",
        })
    }
}