const express = require("express");
const router = express.Router()

const {auth} = require('../middlewares/auth');
const { getUserDetails, getUser, updateFollow, editProfile} = require("../controllers/Profile");

router.get("/getUserDetails", auth, getUserDetails);
router.get("/getUser", auth, getUser);
router.post("/updateFollow", auth, updateFollow);
router.post("/editProfile", auth, editProfile);



module.exports = router;