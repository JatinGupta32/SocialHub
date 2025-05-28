const mongoose = require("mongoose");

const GroupChatSchema = new mongoose.Schema({
    roomId: {
        type: String,
    },
    groupName: {
        type: String,
    },
    groupPhoto: {
        type: String,
        default: "",
    },
    groupPhotoPublicId: {
        type: String,
        default: "",
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