const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 characters"],
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
            required: false,
        },
        url: {
            type: String,
            required: false,
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

//returning JWT token
// userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_TIME,
//     });
// }

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



