const express = require("express");
const router = express.Router();

const{
    signup,
    login,
    logoutUser,
    sendotp,
    changePassword,
    getToken,
} = require("../controllers/Auth");

const {resetPassword,resetPasswordToken} = require("../controllers/ResetPassword")

router.get("/getToken",getToken);
router.post("/signup",signup);
router.post("/sendotp",sendotp);
router.post("/login",login);
router.post("/logoutUser",logoutUser);
router.post("/changepassword",changePassword)
router.post("/resetpasswordtoken",resetPasswordToken)
router.post("/reset-password",resetPassword)

module.exports = router;