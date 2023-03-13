const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Company = require("../models/companyModel")

exports.isAuthenticatedUser = async (req, res, next) => {
    const {token} = req.cookies;
    if (!token){
        return res.send({success:false,message:"Please login to continue"});
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedUser.id);
    if (!req.user){
        req.user = await Company.findById(decodedUser.id);
    }
    next();
}