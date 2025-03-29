const express = require("express");
const router = express.Router()

const getUserDetails = require("../controllers/Profile");
const auth= require('../middlewares/auth')

router.get("/getuserdetails", auth, getUserDetails);