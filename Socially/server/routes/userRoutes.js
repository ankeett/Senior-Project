const express = require("express");

const router = express.Router();  

const {registerUser,loginUser,sendActivationEmail,activateAccount} = require("../controllers/userController.js");

//user routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/account/sendactivate").post(sendActivationEmail);
router.route("/account/activate/:token").put(activateAccount);



module.exports  = router;