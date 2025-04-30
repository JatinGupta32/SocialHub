const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
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
    },
})

module.exports = mongoose.model("message",messageSchema);