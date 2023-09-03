const Message = require("../models/messageModel");
const User = require("../models/userModel");

/*
createMessage(req, res, next)
NAME
    createMessage
SYNOPSIS
    createMessage(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for passing control.
DESCRIPTION
    This controller function handles the creation of a new message between users.
    It extracts the sender's ID from the authenticated user and the receiver's ID and message content from the request body.
    After validation, it creates a new message in the database and sends a success response with the message data.
    In case of errors, it sends an appropriate error response.
PARAMETERS
    - req: Request - Express request object containing user data and message details.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for passing control.
RETURNS
    This function sends an HTTP response with status and message data, or an error response if an issue occurs.
*/
exports.createMessage = async (req, res, next) => {
  try {
    //extract the sender's ID from the authenticated user
    const sender = req.user._id;
    const { receiver, message } = req.body;

    //validate the request body
    if (!receiver || !message) {
      return res.status(400).json({
        status: "fail",
        message: "Please enter all the fields",
      });
    }

    //check if the receiver exists
    const receiverExists = await User.findById(receiver);
    if (!receiverExists) {
      return res.status(400).json({
        status: "fail",
        message: "Receiver not found",
      });
    }

    //create a new message
    let newMessage = await Message.create({
      sender,
      receiver,
      message,
    });
    
    // Respond with a success message and the new message data
    res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      data: {
        newMessage,
      },
    });
  } catch (error) {
    console.error("error",error);
    // Respond with an error message
    res.status(500).json({
      status: "error",
      message: "Something went wrong while creating the message",
    });
  }
}

/*
getMessages(req, res, next)
NAME
    getMessages
SYNOPSIS
    getMessages(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: Function - Express middleware function.
DESCRIPTION
    This controller function retrieves a list of messages for the authenticated user.
    It queries the database to find all messages where the sender or receiver is the authenticated user.
    The retrieved messages are then sent as a response.
    If an error occurs during the operation, it invokes the 'next' middleware function with the error.
PARAMETERS
    - req: Request - Express request object containing user authentication data.
    - res: Response - Express response object used to send HTTP responses.
    - next: Function - Express middleware function to handle errors.
RETURNS
    This function sends an HTTP response with a list of messages in the 'messages' field or invokes the 'next' function with an error if an issue occurs.
*/
exports.getMessages = async (req, res,next) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id },
      ],
    }).populate("sender receiver");

    res.status(200).json({
      status: "success",
      messages,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}

/*
getConversation(req, res, next)
NAME
    getConversation
SYNOPSIS
    getConversation(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: Function - Express middleware function.
DESCRIPTION
    This controller function retrieves a conversation between the authenticated user and another user.
    It queries the database to find messages exchanged between the two users based on their unique identifiers.
    The retrieved messages are then sent as a response.
    If an error occurs during the operation, it invokes the 'next' middleware function with the error.
PARAMETERS
    - req: Request - Express request object containing user authentication data and parameters.
    - res: Response - Express response object used to send HTTP responses.
    - next: Function - Express middleware function to handle errors.
RETURNS
    This function sends an HTTP response with the conversation messages in the 'messages' field or invokes the 'next' function with an error if an issue occurs.
*/
exports.getConversation = async (req, res,next) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.id },
        { sender: req.params.id, receiver: req.user._id },
      ],
    }).populate("sender receiver");

    res.status(200).json({
      status: "success",
      messages,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}



