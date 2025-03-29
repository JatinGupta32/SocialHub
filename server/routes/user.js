const express = require("express");
const router = express.Router();

const{
    signup,
    login,
    sendotp,
    changePassword,
} = require("../controllers/Auth");

const {resetPassword,resetPasswordToken} = require("../controllers/ResetPassword")

router.post("/signup",signup);
router.post("/sendotp",sendotp);
router.post("/login",login);
router.post("/changepassword",changePassword)
router.post("/resetpasswordtoken",resetPasswordToken)
router.post("/reset-password",resetPassword)

module.exports = router;