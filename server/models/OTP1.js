const mongoose = require("mongoose");

const OTP1Schema = mongoose.Schema({
    contactNumber: {
        type: Number,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60*5,
    }
});

module.exports = mongoose.model("OTP1",OTP1Schema);