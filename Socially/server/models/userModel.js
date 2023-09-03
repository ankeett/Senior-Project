const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/*
userSchema
NAME
    userSchema
SYNOPSIS
    userSchema;
DESCRIPTION
    This Mongoose schema defines the structure for user profiles. It includes properties such as name, username, email, password,
    avatar information, user role, creation timestamp, tokens for password reset and account activation, account activation status,
    user followers and followings, and timestamps for document creation and updates.
PROPERTIES
    - name: String (required: true, maxLength: 30)
        - The name of the user, required with a maximum length of 30 characters.
    - username: String (required: true, maxLength: 30, unique)
        - The username of the user, required, unique, and with a maximum length of 30 characters.
    - email: String (required: true, unique, validate: isEmail)
        - The email address of the user, required, unique, and validated to be in email format.
    - password: String (required: true, minlength: 8, select: false)
        - The password of the user, required with a minimum length of 8 characters. 'select: false' hides this field in query results.
    - avatar: Object
        - An object containing 'public_id' and 'url' properties representing the user's avatar image information.
    - role: String (default: "user")
        - The role of the user, with a default value of "user".
    - createdAt: Date (default: Date.now)
        - The timestamp when the user profile was created, with a default value set to the current date and time.
    - resetPasswordToken: String
        - A token for password reset.
    - resetPasswordExpire: Date
        - The expiration date for the password reset token.
    - activateToken: String
        - A token for account activation.
    - activateExpire: Date
        - The expiration date for the account activation token.
    - isActivated: Boolean (default: false)
        - A flag indicating whether the user's account is activated (default is set to false).
    - following: Array of ObjectId (ref: "User")
        - An array of user IDs representing users that the current user is following.
    - followers: Array of ObjectId (ref: "User")
        - An array of user IDs representing users who are following the current user.
TIMESTAMPS
    The schema uses the 'timestamps' option to automatically generate 'createdAt' and 'updatedAt' timestamps for documents.
*/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    username: {
        type: String,
        required: [true, "Please enter your username"],
        maxLength: [30, "Your username cannot exceed 30 characters"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Your password must be longer than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    activateToken: String,
    activateExpire: Date,

    isActivated: {
        type: Boolean,
        default: false,
    },
    following: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
},{
    timestamps: true,
});

//hashing the password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
});

//compare the password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

//generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    //generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hash and set to resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    //set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

//activate token
userSchema.methods.getActivateToken = function () {
    //generate token
    const activateToken = crypto.randomBytes(20).toString("hex");

    //hash and set to resetPasswordToken
    this.activateToken = crypto
        .createHash("sha256")
        .update(activateToken)
        .digest("hex");

    //set token expire time
    this.activateExpire = Date.now() + 30 * 60 * 1000;

    return activateToken;
}

module.exports = mongoose.model("User", userSchema);