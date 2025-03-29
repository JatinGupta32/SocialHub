const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Male","Female","Other"],
    },
    dateOfBirth: {
        type: Date,
    }
})

module.exports =  mongoose.model("profile",profileSchema);