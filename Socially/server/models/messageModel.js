const mongoose = require("mongoose");

/*
messageSchema
NAME
    messageSchema
SYNOPSIS
    messageSchema;
DESCRIPTION
    This Mongoose schema defines the structure for a chat message. A chat message consists of the sender's and receiver's
    user IDs, the message content, and the timestamp when the message was created.
PROPERTIES
    - sender: ObjectId (ref: "User", required: true)
        - The ID of the user who sent the message.
    - receiver: ObjectId (ref: "User", required: true)
        - The ID of the user who received the message.
    - message: String (required: true)
        - The content of the chat message.
    - createdAt: Date (default: Date.now)
        - The timestamp when the message was created, with a default value set to the current date and time.
*/
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
    message: {
        type: String,
        required: [true, "Please enter message"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

