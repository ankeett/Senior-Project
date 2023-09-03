/*
messageRoutes.js
DESCRIPTION
    This Express router defines the routes related to messages. It includes routes for creating messages,
    retrieving messages, and getting conversations. Authentication middleware 'isAuthenticatedUser' is applied
    to protect these routes.
ROUTES
    - POST /message/create: Creates a new message.
    - GET /messages: Retrieves messages.
    - GET /conversation/:id: Retrieves a conversation by its ID.
MIDDLEWARE
    - isAuthenticatedUser: Protects the routes by ensuring that only authenticated users can access them.
EXPORT
    Exports the router for use in other parts of the application.
*/

const express = require("express");
const router = express.Router();  

const {isAuthenticatedUser} = require("../middleware/auth.js");
const {createMessage,getMessages,getConversation} = require("../controllers/messageController.js");

//post routes
router.route("/message/create").post(isAuthenticatedUser,createMessage);
router.route("/messages").get(isAuthenticatedUser,getMessages);
router.route("/conversation/:id").get(isAuthenticatedUser,getConversation);

module.exports  = router;