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
    image: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }
    ],
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

//store user information inside user of comment
postSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
    }).populate({
        path: "comments.user",
    });
    next();
});

module.exports = mongoose.model("Post", postSchema);

