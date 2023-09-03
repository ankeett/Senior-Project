const Notification = require('../models/notificationModel');

/*
createNotification(req, res, next)
NAME
    createNotification
SYNOPSIS
    createNotification(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: Function - Express middleware function.
DESCRIPTION
    This controller function creates and sends a notification to a recipient user.
    It takes the recipient's user ID, sender's user ID, a message, and an optional link as input in the request body.
    The function creates a new notification in the database and responds with a success message.
    If an error occurs during the operation, it invokes the 'next' middleware function with the error.
PARAMETERS
    - req: Request - Express request object containing user authentication data and notification details.
    - res: Response - Express response object used to send HTTP responses.
    - next: Function - Express middleware function to handle errors.
RETURNS
    This function sends an HTTP response indicating the status of the notification creation or invokes the 'next' function with an error if an issue occurs.
*/
exports.createNotification = async (req, res,next) => {
    try {
        const { recipient, sender, message, link } = req.body;
    
        let notification = await Notification.create({
        recipient,
        sender,
        message,
        link,
        });
    
        res.status(201).json({
        status: 'success',
        message: 'Notification sent successfully',
        data: {
            notification,
        },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        status: 'error',
        message: 'Something went wrong while creating the notification',
        });
    }
};

/*
getNotification(req, res, next)
NAME
    getNotification
SYNOPSIS
    getNotification(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: Function - Express middleware function.
DESCRIPTION
    This controller function retrieves notifications by its unique identifier for the authenticated user.
    It fetches the notification from the database and populates the sender information.
    The function responds with the fetched notification.
    If an error occurs during the operation, it invokes the 'next' middleware function with the error.
PARAMETERS
    - req: Request - Express request object containing user authentication data and the notification ID.
    - res: Response - Express response object used to send HTTP responses.
    - next: Function - Express middleware function to handle errors.
RETURNS
    This function sends an HTTP response containing the fetched notification or invokes the 'next' function with an error if an issue occurs.
*/
exports.getNotifications = async (req, res,next) => {
    try {
        const notifications = await Notification.find({
            recipient: req.user._id,
        }).populate('sender');

        res.status(200).json({
            status: 'success',
            results: notifications.length,
            notifications,
            
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}

/*
getNotification(req, res, next)
NAME
    getNotification
SYNOPSIS
    getNotification(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: Function - Express middleware function.
DESCRIPTION
    This controller function retrieves a single notification by its unique identifier for the authenticated user.
    It fetches the notification from the database and populates the sender information.
    The function responds with the fetched notification.
    If an error occurs during the operation, it invokes the 'next' middleware function with the error.
PARAMETERS
    - req: Request - Express request object containing user authentication data and the notification ID.
    - res: Response - Express response object used to send HTTP responses.
    - next: Function - Express middleware function to handle errors.
RETURNS
    This function sends an HTTP response containing the fetched notification or invokes the 'next' function with an error if an issue occurs.
*/
exports.getNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                notification,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}