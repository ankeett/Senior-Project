const Message = require("../models/messageModel");

exports.createMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const sender = req.user._id;
        const receiver = req.params.id;
    
        let message = await Message.findOneAndUpdate(
          {
            $or: [
              { sender, receiver },
              { sender: receiver, receiver: sender },
            ],
          },
          { $push: { content: content } },
          { new: true, upsert: true }
        );
    
        res.status(201).json({
          status: "success",
          message: "Message sent successfully",
          data: {
            message,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status: "error",
          message: "Something went wrong while creating the message",
        });
      }
}

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id },
                { receiver: req.user._id },
            ],
        }).populate("sender").populate("receiver");

        res.status(200).json({
            status: "success",
            results: messages.length,
            data: {
                messages,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
}

exports.getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                message,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
}

