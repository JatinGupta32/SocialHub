const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    media: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
    },
    music: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
        }
    ]
})

module.exports = mongoose.model("post",postSchema);