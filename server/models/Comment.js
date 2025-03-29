const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    },
    statement: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("comment",commentSchema);
