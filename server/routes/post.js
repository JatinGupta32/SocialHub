const express = require("express");
const router = express.Router()

const {createPost, getUserPosts} = require("../controllers/Post")
const {auth} = require('../middlewares/auth')

router.post("/createPost",createPost);
router.get("/getUserPosts",auth,getUserPosts);

module.exports = router;