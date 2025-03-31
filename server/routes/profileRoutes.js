const express = require("express");
const router = express.Router()

const {auth} = require('../middlewares/auth');
const { getUserDetails } = require("../controllers/Profile");

router.get("/getUserDetails", auth, getUserDetails);

module.exports = router;