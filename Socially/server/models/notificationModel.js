const mongoose = require('mongoose');

/*
notificationSchema
NAME
    notificationSchema
SYNOPSIS
    notificationSchema;
DESCRIPTION
    This Mongoose schema defines the structure for user notifications. A notification includes information about the
    recipient, sender, message content, an optional link, whether it has been read, and the timestamp of its creation.
PROPERTIES
    - recipient: ObjectId (ref: "User", required: true)
        - The ID of the user who receives the notification.
    - sender: ObjectId (ref: "User", required: true)
        - The ID of the user who sent the notification.
    - message: String (required: true)
        - The content of the notification message.
    - link: String
        - An optional link associated with the notification (e.g., a link to view more details).
    - isRead: Boolean (default: false)
        - Indicates whether the notification has been read (default is set to false).
    - createdAt: Date (default: Date.now)
        - The timestamp when the notification was created, with a default value set to the current date and time.
*/
const notificationSchema = new mongoose.Schema({
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
    },
  sender: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true 
    },
  message: { 
    type: String, 
    required: true 
    },
  link: { 
    type: String 
    },
  isRead: { 
    type: Boolean,
     default: false 
    },
  createdAt: { 
    type: Date, 
    default: Date.now 
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
