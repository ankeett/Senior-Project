const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: [true, "Please enter post content"],
    },
    image: {
        public_id: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: false,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,

        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            comment: {
                type: String,
                required: [true, "Please enter comment"],
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            likes: [
                {
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true,
                },
            ],
            
        },

    ],
    tags: [
        {
            type: String,
            required: true,
        },
    ],
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },

});

module.exports = mongoose.model("Post", postSchema);

