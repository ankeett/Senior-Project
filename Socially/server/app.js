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

module.exports = app;