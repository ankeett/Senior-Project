const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


exports.registerUser = async (req, res, next) => {
    try{
        const {name,username,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"Please enter all fields"});

        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,message:"User already exists"});
        }
        
        const existingUsername = await User.findOne({username});
        if(existingUsername){
            return res.status(400).json({success:false,message:"Username already exists"});
        }

        const user = await User.create({
            name,username,email,password,
        });

        sendToken(user, 201, res);


    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

exports.loginUser = async (req, res, next) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password");
        console.log('sdfssd')
        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found",
            })
            // throw new Error("User not found");
        }
        console.log(user)
        if(user && (await bcryptjs.compare(password,user.password))){
            sendToken(user, 200, res);
            console.log("send token")
        }else{
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            })
            // throw new Error("Invalid email or password");
        }
        console.log('sdfssd2')
    }
    catch(error){
        next(error);
    }
}

//generate JWT token and save to cookie
const generateToken = (id) => {
    console.log('sdfssdtokengenerate')
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
}


//save token into cookies
const sendToken = (user, statusCode, res) => {
    const token = generateToken(user.id);

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure:false,
    };

    res.cookie("token", token, options);
    res.status(statusCode).json({
        success: true,
        token,
        user,
    });

    console.log(token)

}

//send activation email
exports.sendActivationEmail = async (req,res,next) => {

    const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(404).json({success:false,message:"User not found"});
        //throw new Error("User not found");
    }

    if(!user?.isActivated){

        console.log(user.getResetPasswordToken());
        const activateToken = user.getActivateToken();
        await user.save({validateBeforeSave: false});

        try{

            await sendEmail({
                email: user.email,
                subject: "Account Registration",
                html: `<h1>Hi ${user.name.split(' ')[0]},</h1>
                <p>Thank you for registering with us. Please click on the link below to activate your account.</p>
                <a href="http://localhost:3000/activate/${activateToken}">Activate Account</a>
                <p>If the link does not work, please copy and paste the link into your browser.</p>
                <p>http://localhost:3000/activate/${activateToken}</p>
                <p>Thank you.</p>
                <p>Regards,</p>
                <p>Admin</p>
                `,
            });

            res.status(200).json({
                success: true,
                message: "Email sent successfully",
            });
        }
        catch(error){
            user.activateToken = undefined;
            user.activateExpire = undefined;
            await user.save({validateBeforeSave: false});
            res.status(500).json({
                success:false,
                message:"Email could not be sent."
            });
            //throw new Error("Email could not be sent.");        
        }
    }
    else{
        res.status(400).json({
            success: false,
            message: "User already activated",
        });
        //throw new Error("User already activated");
    }

}

//activate user account
exports.activateAccount = async (req,res,next) => {
    const activateToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        activateToken,
        activateExpire: {$gt: Date.now()},
    });

    if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid activation link",
        });
        // throw new Error("Invalid activation link");
    }

    user.isActivated = true;
    user.activateToken = undefined;
    user.activateExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
}

//forgot password
exports.forgotPassword = async (req,res,next) => {
    const user = await User.findOne({email: req.body.email});
    console.log(user)
    if(!user){
        res.status(404).json({success:false,message:"User not found"});
        return;
        //throw new Error("User not found");
    }
    const token = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});
    
    const resetPasswordURL = `http://localhost:3000/api/password/reset/${token}`;
    const message = `Your password reset token is as follows:\n\n${resetPasswordURL}\n\nIf you have not requested this email, then please ignore it.`;

    try{
        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            html: `<h1>Hi ${user.name.split(' ')[0]},</h1>
            <p>${message}</p>
            <p>Thank you.</p>
            <p>Regards,</p>
            <p>Admin</p>
            `,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});
        res.status(500).json({
            success:false,
            message:"Email could not be sent."
        });
        //throw new Error("Email could not be sent.");        
    }
}

//reset password
exports.resetPassword = async (req,res,next) => {
    try{
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()},
        });

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid reset link",
            });
            // throw new Error("Invalid reset link");
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendToken(user, 200, res);


    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Password could not be reset."
        });
        //throw new Error("Password could not be reset.");
    }
}

//change password
exports.changePassword = async (req,res,next) => {
    try{
        console.log(req.user.id);
        const user = await User.findById(req.user.id).select("+password");
        if(!user){
            res.status(404).json({success:false,message:"User not found"});
            return;
            //throw new Error("User not found");
        }
        const isMatch = await user.matchPassword(req.body.prevPassword);
        if(!isMatch){
            res.status(401).json({success:false,message:"Incorrect password"});
            return;
            //throw new Error("Incorrect password");
        }
        user.password = req.body.newPassword;
        await user.save();

        sendToken(user, 200, res);
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Password could not be changed."
        });
        //throw new Error("Password could not be changed.");
    }
}

//load user
exports.loadUser = async (req,res,next) => {
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            res.status(404).json({success:false,message:"User not found"});
            return;
            //throw new Error("User not found");
        }
        res.status(200).json({
            success:true,
            user
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"User could not be loaded."
        });
        //throw new Error("User could not be loaded.");
    }
}

//logout
exports.logout = async (req,res,next) => {
    try{
        res.cookie("token", "none", {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success:true,
            message:"User logged out successfully."
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"User could not be logged out."
        });
        //throw new Error("User could not be logged out.");
    }
}
