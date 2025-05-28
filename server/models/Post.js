const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    photos: [{
        type: String,
        required: true,
    }],
    caption: {
        type: String,
    },
    music: {
        type: String,
    },
    location: {
        type: String,
    },
    tagPeople: {
        type: String,
    },
    commentAllowed: {
        type: Boolean,
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
            ref:"comment"
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("post",postSchema);