/*
Express Application Setup
DESCRIPTION
    This code sets up an Express.js application with various middleware and route configurations.
MIDDLEWARE USED
    - cookieParser: Parses cookies in incoming HTTP requests.
    - bodyParser: Parses JSON and URL-encoded data in incoming requests.
    - dotenv: Loads environment variables from a .env file.
    - cors: Enables Cross-Origin Resource Sharing (CORS) configuration for the app.
    - express.json: Parses JSON data with an increased payload limit.
    - express.urlencoded: Parses URL-encoded data.
ROUTES
    The app defines routes for user-related operations, post-related operations, notification-related operations,
    and message-related operations, all prefixed with "/api".
EXPORT
    Exports the app for use in other parts of the application.
*/

const express = require("express");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(express.json({limit:"50mb"}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200
}));
app.use(bodyParser.urlencoded({limit: "50mb",extended:true}))
app.use(express.urlencoded({extended: true}));

//import all routes
const user = require("./routes/userRoutes");
const post = require("./routes/postRoutes");
const notification = require("./routes/notificationRoutes");
const message = require("./routes/messageRoutes");

app.use("/api", user);
app.use("/api", post);
app.use("/api", notification);
app.use("/api", message);

module.exports = app;