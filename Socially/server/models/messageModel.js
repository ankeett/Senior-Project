const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: [true, "Please enter message content"],
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

module.exports = mongoose.model("Message", messageSchema);