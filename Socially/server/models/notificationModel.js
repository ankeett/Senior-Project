const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true,
    },
    content: {
        type: String,
        required: [true, "Please enter notification content"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Notification", notificationSchema);
