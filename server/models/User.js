const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "profile",
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        }
    ],
    image: {
        type: String,
    },
    privacyStatus: {
            type: String,
            enum: ["private", "public"], 
            default: "private", 
        },
    privateChats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "privateChat",
        }
    ],
    token: {
        type: String
    },
    reserPasswordExpires: {
        type: Date,
    }

})

module.exports = mongoose.model("user",userSchema)