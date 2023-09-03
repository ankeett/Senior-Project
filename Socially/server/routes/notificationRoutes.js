/*
notificationRoutes.js
DESCRIPTION
    This Express router defines the routes related to notifications. It includes routes for creating notifications,
    retrieving notifications, and getting a specific notification by its ID. Authentication middleware 'isAuthenticatedUser'
    is applied to protect these routes.
ROUTES
    - POST /notification/create: Creates a new notification.
    - GET /notifications: Retrieves notifications.
    - GET /notification/:id: Retrieves a specific notification by its ID.
MIDDLEWARE
    - isAuthenticatedUser: Protects the routes by ensuring that only authenticated users can access them.
EXPORT
    Exports the router for use in other parts of the application.
*/
const express = require("express");
const router = express.Router();  

const {createNotification,getNotifications,getNotification} = require("../controllers/notificationController.js");
const {isAuthenticatedUser} = require("../middleware/auth.js");

//post routes
router.route("/notification/create").post(isAuthenticatedUser,createNotification);
router.route("/notifications").get(isAuthenticatedUser,getNotifications);
router.route("/notification/:id").get(isAuthenticatedUser,getNotification);

module.exports  = router;