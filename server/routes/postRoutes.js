const express = require("express");
const router = express.Router()

const {createPost,updateLikeOnPost, getPostDetails, addCommentOnPost, getSocialPosts} = require("../controllers/Post")
const {auth} = require('../middlewares/auth');

router.post("/createPost",auth,createPost);
router.post("/updateLikeOnPost",auth,updateLikeOnPost)
router.get("/getPostDetails", auth, getPostDetails)
router.post("/addCommentOnPost", auth, addCommentOnPost)
router.get("/getSocialPosts", auth, getSocialPosts);

// router.get("/getUserPosts",auth,getUserPosts);

module.exports = router;