const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


exports.registerUser = async (req, res, next) => {
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"Please enter all fields"});

        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,message:"User already exists"});
        }
        const user = await User.create({
            name,email,password,
        });

        sendToken(user, 200, res);


    }
    catch(error){
        next(error);
    }
}

exports.loginUser = async (req, res, next) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password");

        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found",
            })
            // throw new Error("User not found");
        }

        if(user && (await bcryptjs.compare(password,user.password))){
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        }else{
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            })
            // throw new Error("Invalid email or password");
        }
    }
    catch(error){
        next(error);
    }
}

//generate JWT token and save to cookie
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
}


//save token into cookies
const sendToken = (user, statusCode, res) => {
    const token = generateToken(user._id);

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.cookie("token", token, options);
    res.status(statusCode).json({
        success: true,
        token,
        user,
    });
}

//send activation email
exports.sendActivationEmail = async (req,res,next) => {

    const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(404).json({success:false,message:"User not found"});
        //throw new Error("User not found");
    }

    if(!user.isActivated){
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

