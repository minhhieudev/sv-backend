const mongoose = require("mongoose");

const Comment = mongoose.model(
    "comment",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        },
        content: { type: String, required: true },
        image: { type: String, default: null },
        status: { type: Boolean, default: 0 },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: null },
    })
);

module.exports = Comment;