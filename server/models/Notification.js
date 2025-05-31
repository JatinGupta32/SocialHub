const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    message: {
        type: String,
        required: true,
    },
    sendAt: {
        type: Date,
        default: Date.now,
    },
    photo: {
        type: String,
    },

})

module.exports = mongoose.model("notification",notificationSchema);