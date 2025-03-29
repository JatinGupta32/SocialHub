const User = require("../models/User");
const OTP = require("../models/OTP");
const OTP1 = require("../models/OTP1");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const passwordUpdated = require("../mail/changePassword");
// const twilio = require('twilio');
require("dotenv").config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.signup = async (req,res) => {
    try{
        const {
            username,
            fullname,
            identifier,
            password,
            confirmPassword,
            otp,
        } = req.body
        if(!username || !fullname || !identifier || !password || !confirmPassword){
            return res.status(403).send({
                success: false,
                message: "All fields are required",
            })
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            })
        }
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            })
        }
        const isEmail = (input) => /^\S+@\S+\.\S+$/.test(input);
        const isMobileNumber = (input) => /^[+\d]?\d{10,15}$/.test(input);
        let email=null, contactNumber=null;
        let response = null;
        if(isEmail(identifier)){
            email = identifier;
            response = await OTP.find({email}).sort({createdAt: -1}).limit(1)
        }
        if(isMobileNumber(identifier)){
            contactNumber = identifier;
            response = await OTP1.find({contactNumber}).sort({createdAt: -1}).limit(1)
        }    
        console.log(response)

        if(response.length===0){
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            })
        }
        else if(response[0].otp!=otp){
            return res.status(400).json({
                sucess:false,
                message: "The OTP is not valid",
            })
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        //Create the user
        const profileDetails = await Profile.create({
            bio: null,
            gender: null,
            dateOfBirth: null,
        });
        const user = await User.create({
            username,
            fullname,
            email,
            password: hashedPassword,
            contactNumber,
            additionalDetails: profileDetails,
            image: "",
        })
        return res.status(200).json({
            sucess: true,
            user,
            message: "User registered succesfully",
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        })
    }
}

exports.login = async (req,res) => {
    try{
        const {identifier, password} = req.body;
        if(!identifier || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill up all the required fields"
            })
        }
        const isEmail = (input) => /^\S+@\S+\.\S+$/.test(input);
        const isMobileNumber = (input) => /^[+\d]?\d{10,15}$/.test(input);
        let email=null, contactNumber=null, username=null;
        let user = null;
        if(isEmail(identifier)){
            user = await User.findOne({email: identifier});
        }
        else if(isMobileNumber(identifier)){
            user = await User.findOne({contactNumber: identifier});
        }    
        else{
            user = await User.findOne({username: identifier});
        }
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not Registered with Us Please SignUp to Continue",
            })
        }
        // Generate JWT token and Compare Password
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(
                {username: user.username, id: user._id},
                process.env.JWT_SECRET,
                {expiresIn: "24h"}
            )
            user.token = token;
            // Set cookie for token and return success response
            const options ={
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,  // Prevents JavaScript from accessing the cookie (enhances security)
            }
            res.cookie("token",token,options).status(200).json({
                success: true,
                token,
                user,
                message: "User login succesfully"
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure Please Try Again"
        })
    }
}

exports.sendotp = async (req,res) => {
    try{
        const {identifier ,username} = req.body;
        const existUser1 = await User.findOne({username});
        // console.log(existUser1,existUser2);
        if(existUser1){
            return res.status(401).json({
                success: false,
                message: `This username already exists`
            })
        }
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        let result = await OTP.findOne({otp: otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            result = await OTP.findOne({otp: otp});
        }
        console.log(otp);
        const isEmail = (input) => /^\S+@\S+\.\S+$/.test(input);
        const isMobileNumber = (input) => /^[0-9]{10,15}$/.test(input);
        let email=null, contactNumber=null;
        if(isEmail(identifier)){
            email = identifier;
            const existUser2 = await User.findOne({email:identifier});
            if(existUser2){
                return res.status(401).json({
                    success: false,
                    message: `This email already exists`
                })
            }
            const otpBody = await OTP.create({email:identifier, otp:otp});
            console.log("OTP Body", otpBody)
        }
        if(isMobileNumber(identifier)){
            contactNumber = identifier;
            const existUser2 = await User.findOne({contactNumber:identifier});
            if(existUser2){
                return res.status(401).json({
                    success: false,
                    message: `This Phone Number already exists`
                })
            }
            const otpBody = await OTP1.create({contactNumber:identifier, otp:otp});
            if (!contactNumber.startsWith("+")) {
                contactNumber = `+91${contactNumber}`; // Assuming India (+91)
            }
            let msgOptions = {
                from: process.env.TWILIO_PHONE_NUMBER,
                to: contactNumber,
                body: `Welcome to SocialHub! 🚀 Your OTP for verification is: ${otp}. Enter it to unlock a world of seamless social networking! 🌍✨`,
            }
            try{
                const message = await client.messages.create(msgOptions);
                console.log(message);
            }
            catch (error){
                console.error (error);
            }
                
            console.log("OTP sent to mobile:", contactNumber);
            console.log("OTP Body", otpBody)
        }    
        
        return res.status(200).json({
            success: true,
            otp,
            message: `otp Sent Successfully`,
        })
    }
    catch(error){
        console.error("OTP Sending Error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

            // Send OTP via Twilio
            // if (isMobileNumber(identifier)) {
            //     contactNumber = identifier.replace(/\D/g, ''); // Remove any non-numeric characters
            //     if (!contactNumber.startsWith("91")) {  // If Indian number and missing country code
            //         contactNumber = "91" + contactNumber;  // Add India country code
            //     }
            //     contactNumber = `+${contactNumber}`;
            // }
            // console.log("Formatted Phone Number for OTP:", contactNumber);
            // await client.messages.create({
            //     body: `Your OTP for verification is: ${otp}`,
            //     from: process.env.TWILIO_PHONE_NUMBER,
            //     to: `+${contactNumber}`, // Ensure mobile number is in international format (+91 for India)
            // });

exports.changePassword = async (req,res) => {
    try{
        const {username,oldPassword,newPassword} = req.body;
        const userDetails = await User.findOne({username});
        if(await bcrypt.compare(oldPassword,userDetails.password)){
            const hashedNewPassword = await bcrypt.hash(newPassword,10);
            const updatedUserDetails = await User.findOneAndUpdate(
                {username},
                {password: hashedNewPassword},
                {new: true},
            )
            
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated succesfully for ${username}`
                )
            )
            console.log("Email sent successfully:", emailResponse.response)
            return res.status(200).json({
                success: true,
                message: "Password changed succesfully",
            })
        }
        return res.status(401).json({
            success: false,
            message: "Password is incorrect",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
        })
    }
}
