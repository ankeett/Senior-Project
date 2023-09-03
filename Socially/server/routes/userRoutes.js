/*
userRoutes
DESCRIPTION
    This Express router defines the routes related to user actions. It includes routes for user registration,
    login, sending activation emails, activating accounts, password reset, changing passwords, loading user data,
    logging out, following and unfollowing users, and searching for users and friends. The 'isAuthenticatedUser'
    middleware is applied to protect certain routes.
ROUTES
    - POST /register: Registers a new user.
    - POST /login: Logs in a user.
    - GET /user/logout: Logs out a user.
    - POST /account/sendactivate: Sends an activation email.
    - PUT /account/activate/:token: Activates a user's account.
    - POST /account/forgotpassword: Sends a password reset email.
    - PUT /account/resetpassword/:token: Resets a user's password.
    - PUT /account/changePassword: Changes a user's password.
    - GET /me: Loads user data for the authenticated user.
    - PUT /follow/:id: Follows another user.
    - PUT /unfollow/:id: Unfollows another user.
    - GET /search/:query: Searches for users based on a query.
    - GET /user/friends: Finds friends of the authenticated user.
MIDDLEWARE
    - isAuthenticatedUser: Protects certain routes by ensuring that only authenticated users can access them.
EXPORT
    Exports the router for use in other parts of the application.
*/

const express = require("express");
const router = express.Router();  

const {registerUser,loginUser,sendActivationEmail,activateAccount,forgotPassword,resetPassword,changePassword, loadUser,logout,followUser,unfollowUser,searchUser,findFriends} = require("../controllers/userController.js");
const {isAuthenticatedUser} = require("../middleware/auth.js");

//user routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/user/logout').get(isAuthenticatedUser,logout);
router.route("/account/sendactivate").post(sendActivationEmail);
router.route("/account/activate/:token").put(activateAccount);
router.route("/account/forgotpassword").post(forgotPassword);
router.route("/account/resetpassword/:token").put(resetPassword);
router.route('/account/changePassword').put(isAuthenticatedUser,changePassword);
router.route('/me').get(isAuthenticatedUser,loadUser)
router.route('/follow/:id').put(isAuthenticatedUser, followUser);
router.route('/unfollow/:id').put(isAuthenticatedUser, unfollowUser);

//search routes
router.route('/search/:query').get(searchUser);
router.route('/user/friends').get(isAuthenticatedUser, findFriends);


module.exports  = router;