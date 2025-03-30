require("dotenv").config();
const jwt = require('jsonwebtoken')

exports.auth = async (req,res,next) => {
    try{
        console.log(req.body);
        const token = req.body.token || req.cookies.token || req.headers["authorization"]?.replace("Bearer ","");
        console.log(token);
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }
        // console.log("2");
        // Verify the token
        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decodedData);
        if(!decodedData){
            return res.status(403).json({
                success: false,
                message: "Token is invalid"
            })
        }
        // console.log("3");
        req.user = decodedData;
        next();
    }
    catch(error){
        // console.log("4");
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        })
    }
}