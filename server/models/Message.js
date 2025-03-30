// const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    reciever: {
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
})

module.exports = mongoose.model("message",messageSchema);