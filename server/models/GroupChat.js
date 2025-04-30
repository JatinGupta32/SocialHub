const mongoose = require("mongoose");

const GroupChatSchema = new mongoose.Schema({
    roomId: {
        type: String,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",
    }]
})

module.exports =  mongoose.model("groupChat",GroupChatSchema);