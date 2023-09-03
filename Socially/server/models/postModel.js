const mongoose = require("mongoose");

/*
postSchema
NAME
    postSchema
SYNOPSIS
    postSchema;
DESCRIPTION
    This Mongoose schema defines the structure for user posts. A post includes information about the user who created it,
    the post content, associated images, creation timestamp, likes, comments, tags, and visibility status.
PROPERTIES
    - user: ObjectId (ref: "User", required: true)
        - The ID of the user who created the post.
    - content: String (required: true)
        - The content of the post.
    - image: Array of Objects
        - An array containing image objects with 'public_id' and 'url' properties for cloud storage.
    - createdAt: Date (default: Date.now)
        - The timestamp when the post was created, with a default value set to the current date and time.
    - likes: Array of ObjectId (ref: "User", required: true)
        - An array of user IDs who have liked the post.
    - comments: Array of Objects
        - An array of comment objects, each containing the user who posted the comment, the comment content, creation timestamp,
          and an array of user IDs who liked the comment.
    - tags: Array of String (required: true)
        - An array of tags associated with the post.
    - visibility: String (enum: ["public", "private"], default: "public")
        - The visibility status of the post, which can be either 'public' or 'private' (default is set to 'public').
*/
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

