const express = require("express");

const router = express.Router();  

const {registerUser,loginUser,sendActivationEmail,activateAccount,forgotPassword,resetPassword,changePassword, loadUser} = require("../controllers/userController.js");
const {isAuthenticatedUser} = require("../middleware/auth.js");

//user routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/account/sendactivate").post(sendActivationEmail);
router.route("/account/activate/:token").put(activateAccount);

router.route("/account/forgotpassword").post(forgotPassword);
router.route("/account/resetpassword/:token").put(resetPassword);
router.route('/account/changePassword').put(changePassword);
router.route('/me').get(isAuthenticatedUser,loadUser)


module.exports  = router;