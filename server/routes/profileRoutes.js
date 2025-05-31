const express = require("express");
const router = express.Router()

const {auth} = require('../middlewares/auth');
const { getUserDetails, getUser, updateFollow, editProfile, getUnfollowUser, getAllUsers, acceptFollowRequest, cancelRequest} = require("../controllers/Profile");

router.get("/getUserDetails", auth, getUserDetails);
router.get("/getUser", auth, getUser);
router.post("/updateFollow", auth, updateFollow);
router.post("/acceptFollowRequest", auth, acceptFollowRequest);
router.post("/editProfile", auth, editProfile);
router.get("/getUnfollowUser", auth, getUnfollowUser);
router.post("/cancelRequest", auth, cancelRequest);
router.get("/getAllUsers", getAllUsers);

module.exports = router;