const User = require("../models/User");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");

exports.resetPasswordToken = async (req,res) => {
    try{
        const {email} = req.body;
        const user  = await User.findOne({email});
        if(!email){
            return res.status(400).json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email`
            })
        }

        const token = crypto.randomBytes(20).toString("hex");
        const updatedUserDetails = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                reserPasswordExpires: Date.now()+3600000,
            },
            {new: true}
        )
        console.log("DETAILS", updatedUserDetails)
        const url = `http://localhost:3000/update-password/${token}`;
        const emailResponse = await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )
        return res.status(200).json({
            success: true,
            message: "Email Sent Successfully, Please Check Your Email to Continue Further"
        })
    }
    catch(error){
        Console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some Error in Sending the Reset Message"
        })
    }    
}

exports.resetPassword = async (req,res) => {
    try{
        const {newPassword,confirmNewPassword,token} = req.body;
        if(!newPassword || !confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: "Fill up all the required fields"
            })
        }
        if(newPassword!==confirmNewPassword){
            return res.status(401).json({
                success: false,
                message: "Fill up all the required fields"
            })
        }
        const user = await User.findOne({token});
        if (!user) {
            return resstatus(401).json({
              success: false,
              message: "Token is Invalid",
            })
        }
        if(user.reserPasswordExpires<Date.now()){
            return res.status(403).json({
                success: false,
                message: "Token is Expired, Please Regenerate Your Token",
              })
        }
        if(await bcrypt.compare(user.password,newPassword)){
            return res.status(401).json({
                success: false,
                message: "New password must be diiferent from old password"
            }) 
        }
        const hashedNewPassword = await bcrypt.hash(newPassword,10);
        const updatedUserDetails = await User.findOneAndUpdate(
            {token: token},
            {password: hashedNewPassword},
            {new: true}
        )
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        }) 
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some error in updating the Password"
        }) 
    }
    
}