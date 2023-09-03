const nodeMailer = require("nodemailer");

/*
sendEmail
NAME
    sendEmail
SYNOPSIS
    sendEmail(options);
    - options: Object - An object containing email-related options:
DESCRIPTION
    This utility function is responsible for sending email messages using the Nodemailer library.
PARAMETERS
    - options: An object containing email-related options:
        - email: The recipient's email address.
        - subject: The subject of the email.
        - message: The plain text message of the email.
        - html: The HTML content of the email (can be used for rich content).
RETURN VALUE
    This function does not return a value but sends the email using the provided options.
*/
const sendEmail = async(options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;