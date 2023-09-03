const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary").v2;

/*
registerUser(req, res, next)
NAME
    registerUser
SYNOPSIS
    registerUser(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function handles user registration by processing user information, including name, username, email, password, and avatar.
    It uploads the user's avatar image to a cloud storage service (e.g., Cloudinary) and creates a new user account.
    Upon successful registration, it sends an authentication token in the response.
PARAMETERS
    - req: Request - Express request object containing user registration data, including name, username, email, password, and avatar.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with an authentication token upon successful user registration.
    If an error occurs during registration, it sends an HTTP response with an error message and a 500 status code.
*/
exports.registerUser = async (req, res, next) => {
    try{
        //check if image is uploaded
        if(!req.body.avatar){
            return res.status(400).json({success:false,message:"Please upload an image"});
        }
        //upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.body.avatar,{
            folder:"BeaconAvatars",
            width:150,
            crop:"scale"
        });
        //add image to req.body
        req.body.avatar = {
            public_id:result.public_id,
            url:result.secure_url
        }
        //extract user information from request body
        const {name,username,email,password} = req.body;

        //validate user information
        if(!name || !email || !password || !username){
            return res.status(400).json({success:false,message:"Please enter all fields"});

        }

        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,message:"User already exists"});
        }
        //check if the username already exists
        const existingUsername = await User.findOne({username});
        if(existingUsername){
            return res.status(400).json({success:false,message:"Username already exists"});
        }

        //Create new user
        const user = await User.create({
            name,username,email,password, avatar: req.body.avatar
        });

        //send token
        sendToken(user, 201, res);
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

/*
loginUser(req, res, next)
NAME
    loginUser
SYNOPSIS
    loginUser(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function handles user login by verifying the provided email and password.
    It looks up the user by email, compares the provided password with the stored hashed password, and sends an authentication token upon successful login.
    If the login credentials are invalid, it returns an error response.
PARAMETERS
    - req: Request - Express request object containing user login data, including email and password.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with an authentication token upon successful user login.
    If the login credentials are invalid, it sends an HTTP response with a 401 status code and an error message.
*/
exports.loginUser = async (req, res, next) => {
    try{
        //extract user information from request body
        const {email,password} = req.body;

        //Find user in database by email and select password field (which is hidden by default)
        const user = await User.findOne({email}).select("+password");

        //validate user information
        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found",
            })
            // throw new Error("User not found");
        }

        //check if password matches
        if(user && (await bcryptjs.compare(password,user.password))){
            sendToken(user, 200, res);
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

/*
generateToken(id)
NAME
    generateToken
SYNOPSIS
    generateToken(id);
    - id: string - The user's unique identifier.
DESCRIPTION
    This function generates a JSON Web Token (JWT) for user authentication and authorization.
    It takes the user's unique identifier (ID) as input, signs the token with a secret key, and sets an expiration time based on the environment configuration.
PARAMETERS
    - id: string - The user's unique identifier (ID).
RETURNS
    A JWT token string with the user's ID embedded and signed with the secret key.
*/
const generateToken = (id) => {
    //generate token
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        //set expiration time
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
}


/*
sendToken(user, statusCode, res)
NAME
    sendToken
SYNOPSIS
    sendToken(user, statusCode, res);
    - user: object - The user object containing user information.
    - statusCode: number - The HTTP status code to send in the response.
    - res: Response - Express response object.
DESCRIPTION
    This function generates a JSON Web Token (JWT) for the provided user, sets it as an HTTP cookie, and sends it in the response.
    It also includes the user object in the response payload.
PARAMETERS
    - user: object - The user object containing user information.
    - statusCode: number - The HTTP status code to send in the response.
    - res: Response - Express response object used to send HTTP responses.
RETURNS
    This function sends an HTTP response containing a JWT token as an HTTP cookie and includes the user object in the response payload.
*/
const sendToken = (user, statusCode, res) => {
    //generate token
    const token = generateToken(user.id);

    //set cookie options
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure:false,
    };

    //send response
    res.cookie("token", token, options);
    res.status(statusCode).json({
        success: true,
        token,
        user,
    });

}

/*
sendActivationEmail(req, res, next)
NAME
    sendActivationEmail
SYNOPSIS
    sendActivationEmail(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function sends an activation email to a user who has registered but has not yet activated their account.
    It generates an activation token for the user, saves it to the database, and sends an email containing an activation link.
    If the activation email is sent successfully, it responds with a success message. Otherwise, it handles errors gracefully.
PARAMETERS
    - req: Request - Express request object containing the user's email.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response indicating the status of the activation email sending process.
*/
exports.sendActivationEmail = async (req,res,next) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(404).json({success:false,message:"User not found"});
        //throw new Error("User not found");
    }
    
    //check if user is already activated
    if(!user?.isActivated){
        const activateToken = user.getActivateToken();
        await user.save({validateBeforeSave: false});

        //send email
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

            //if email could not be sent, remove activation token and expiration date
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
        //if user is already activated, send error message
        res.status(400).json({
            success: false,
            message: "User already activated",
        });
        //throw new Error("User already activated");
    }

}

/*
activateAccount(req, res, next)
NAME
    activateAccount
SYNOPSIS
    activateAccount(req, res, next);
    - req: Request - Express request object containing the activation token as a parameter.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function activates a user's account using the activation token provided in the request parameters.
    It checks if the token is valid and not expired, updates the user's account status to activated, and sends a new token for authentication.
    If the activation is successful, it responds with a success message. Otherwise, it handles errors gracefully.
PARAMETERS
    - req: Request - Express request object containing the activation token as a parameter.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response indicating the status of the account activation process.
*/
exports.activateAccount = async (req,res,next) => {
    //get token from request parameters
    const activateToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    //find user by activation token and check if token is valid and not expired
    const user = await User.findOne({
        activateToken,
        activateExpire: {$gt: Date.now()},
    });

    //if token is invalid or expired, send error message
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid activation link",
        });
        // throw new Error("Invalid activation link");
    }

    //if token is valid and not expired, update user account status to activated
    user.isActivated = true;
    user.activateToken = undefined;
    user.activateExpire = undefined;
    await user.save();

    //send token
    sendToken(user, 200, res);
}

/*
forgotPassword(req, res, next)
NAME
    forgotPassword
SYNOPSIS
    forgotPassword(req, res, next);
    - req: Request - Express request object containing the user's email address.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function initiates the process of resetting a user's password by sending a password reset email.
    It checks if the user with the provided email address exists, generates a reset password token, and sends an email with a link to reset the password.
    If the email is sent successfully, it responds with a success message. Otherwise, it handles errors gracefully.
PARAMETERS
    - req: Request - Express request object containing the user's email address.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response indicating the status of the password reset email sending process.
*/
exports.forgotPassword = async (req,res,next) => {
    //find user by email
    const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(404).json({success:false,message:"User not found"});
        return;
        //throw new Error("User not found");
    }
    //generate reset password token
    const token = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});
  
    const resetPasswordURL = `http://localhost:3000/api/password/reset/${token}`;
    const message = `Your password reset token is as follows:\n\n${resetPasswordURL}\n\nIf you have not requested this email, then please ignore it.`;

    //send email
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
        
        //send response
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    }
    catch(error){
        //if email could not be sent, remove reset password token and expiration date
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

/*
resetPassword(req, res, next)
NAME
    resetPassword
SYNOPSIS
    resetPassword(req, res, next);
    - req: Request - Express request object containing the reset password token and the new password.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function resets a user's password by verifying the reset password token and setting the new password.
    It checks if the provided reset password token is valid and not expired, then updates the user's password and clears the reset token.
    If the password is successfully reset, it responds with a new authentication token. Otherwise, it handles errors gracefully.
PARAMETERS
    - req: Request - Express request object containing the reset password token and the new password.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response indicating the status of the password reset process.
*/
exports.resetPassword = async (req,res,next) => {
    try{
        //get token from request parameters
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        //find user by reset password token and check if token is valid and not expired
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()},
        });

        //if token is invalid or expired, send error message
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid reset link",
            });
            // throw new Error("Invalid reset link");
        }

        //if token is valid and not expired, update user password and clear reset token
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        //send token
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

/*
changePassword(req, res, next)
NAME
    changePassword
SYNOPSIS
    changePassword(req, res, next);
    - req: Request - Express request object containing the previous password and the new password.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function allows a user to change their password by verifying the previous password and setting a new one.
    It checks if the provided previous password matches the current password, then updates the password with the new one.
    If the password is successfully changed, it responds with a new authentication token. Otherwise, it handles errors gracefully.
PARAMETERS
    - req: Request - Express request object containing the previous password and the new password.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response indicating the status of the password change process.
*/
exports.changePassword = async (req,res,next) => {
    try{
        //find user by ID and select password field (which is hidden by default)
        const user = await User.findById(req.user.id).select("+password");
        if(!user){
            res.status(404).json({success:false,message:"User not found"});
            return;
            //throw new Error("User not found");
        }
        //check if previous password matches
        const isMatch = await user.matchPassword(req.body.prevPassword);

        //if previous password does not match, send error message
        if(!isMatch){
            res.status(401).json({success:false,message:"Incorrect password"});
            return;
            //throw new Error("Incorrect password");
        }
        //if previous password matches, update password with new password
        user.password = req.body.newPassword;
        await user.save();

        //send token
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

/*
loadUser(req, res, next)
NAME
    loadUser
SYNOPSIS
    loadUser(req, res, next);
    - req: Request - Express request object containing the user's ID.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function retrieves and loads user data based on the provided user ID, typically from an authentication token.
    It checks if a user with the given ID exists and, if found, responds with the user's data.
    If the user is not found or if there is an error during the process, it handles errors gracefully.
PARAMETERS
    - req: Request - Express request object containing the user's ID.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the loaded user's data or an error message.
*/
exports.loadUser = async (req,res,next) => {
    try{
        const user = await User.findById(req.user.id);

        //if user is not found, send error message
        if(!user){
            res.status(404).json({success:false,message:"User not found"});
            return;
            //throw new Error("User not found");
        }
        //if user is found, send user data
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

/*
logout(req, res, next)
NAME
    logout
SYNOPSIS
    logout(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function logs the user out by clearing their authentication token cookie.
    It sets the token cookie to "none" and immediately expires it, effectively logging the user out.
    After successful logout, it responds with a success message.
    If there's an error during the logout process, it handles the error gracefully.
PARAMETERS
    - req: Request - Express request object.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response indicating successful logout or an error message.
*/
exports.logout = async (req,res,next) => {
    try{
        //set token cookie to "none" and immediately expire it
        res.cookie("token", "none", {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        //send response
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

/*
followUser(req, res, next)
NAME
    followUser
SYNOPSIS
    followUser(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function allows the authenticated user to follow another user.
    It updates the follower and following lists for both users.
    After a successful follow operation, it responds with the updated user data.
    If there's an error during the follow process, it handles the error gracefully.
PARAMETERS
    - req: Request - Express request object containing user IDs for the follower and the user to follow.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the updated user data upon successful follow,
    or an error message if the follow operation encounters an issue.
*/
exports.followUser = async (req,res,next) => {
    try{
        //find user by ID
        const user = await User.findById(req.user.id);

        //if user is not found, send error message
        if(!user){
            res.status(404).json({success:false,message:"User not found"});
            return;
            //throw new Error("User not found");
        }
        //find user to follow by ID
        const userToFollow = await User.findById(req.params.id);

        //if user to follow is not found, send error message
        if(!userToFollow){
            res.status(404).json({success:false,message:"User to follow not found"});
            return;
            //throw new Error("User to follow not found");
        }

        //if user is already following the user to follow, send error message
        if(userToFollow.followers.includes(req.user.id)){
            res.status(400).json({success:false,message:"User already followed"});
            return;
            //throw new Error("User already followed");
        }

        //update follower and following lists for both users
        userToFollow.followers.push(req.user.id);
        await userToFollow.save();
        user.following.push(req.params.id);
        await user.save();

        res.status(200).json({
            success:true,
            user
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"User could not be followed."
        });
        //throw new Error("User could not be followed.");
    }
}

/*
unfollowUser(req, res, next)
NAME
    unfollowUser
SYNOPSIS
    unfollowUser(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function allows the authenticated user to unfollow another user.
    It updates the follower and following lists for both users by removing the association.
    After a successful unfollow operation, it responds with the updated user data.
    If there's an error during the unfollow process, it handles the error gracefully.
PARAMETERS
    - req: Request - Express request object containing user IDs for the follower and the user to unfollow.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the updated user data upon successful unfollow,
    or an error message if the unfollow operation encounters an issue.
*/
exports.unfollowUser = async (req,res,next) => {
    try{

        //find user by ID
        const user = await User.findById(req.user.id);

        //if user is not found, send error message
        if(!user){
            res.status(404).json({success:false,message:"User not found"});
            return;
            //throw new Error("User not found");
        }

        //find user to unfollow by ID
        const userToUnfollow = await User.findById(req.params.id);
        if(!userToUnfollow){
            res.status(404).json({success:false,message:"User to unfollow not found"});
            return;
            //throw new Error("User to unfollow not found");
        }

        //if user is not following the user to unfollow, send error message
        if(!userToUnfollow.followers.includes(req.user.id)){
            res.status(400).json({success:false,message:"User not followed"});
            return;
            //throw new Error("User not followed");
        }

        //update follower and following lists for both users by removing the association
        userToUnfollow.followers = userToUnfollow.followers.filter(follower => follower != req.user.id);
        await userToUnfollow.save();
        user.following = user.following.filter(following => following != req.params.id);
        await user.save();

        //send response
        res.status(200).json({
            success:true,
            user
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"User could not be unfollowed."
        });
        //throw new Error("User could not be unfollowed.");
    }
}

/*
searchUser(req, res, next)
NAME
    searchUser
SYNOPSIS
    searchUser(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function allows searching for users by name, username, or email based on a query string.
    It constructs a search query using regular expressions to perform a case-insensitive search.
    The search results exclude the current user from the list.
    Upon successful search, it responds with the found user data.
    If there are no matching users or an error occurs, it handles the error gracefully.
PARAMETERS
    - req: Request - Express request object containing the query string for user search.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the found users or an error message
    if the search encounters an issue.
*/
exports.searchUser = async (req,res,next) => {
    try{
        //get query string from request parameters
        const query = req.params.query || '';

        //construct search query using regular expressions to perform a case-insensitive search
        const searchQuery = {
            $or: [
              { name: { $regex: query, $options: 'i' } },
              { username: { $regex: query, $options: 'i' } },
              { email: { $regex: query,$options: 'i' } }
            ]
          };
          
          //find users matching the search query and exclude the current user from the list
          const users = await User.find(searchQuery).select("-password");

          //if no users are found, send error message
          if(users.length == 0){
              res.status(404).json({success:false,message:"Users not found"});
              return;
              //throw new Error("Users not found");
            }
        
        //send response
        res.status(200).json({
            success:true,
            users
        });

    }
    catch(error){
        if (error.name === "MongoError") {
            console.error("MongoDB Error:", error);
        } else {
            console.error("Error searching users:", error);
        }
        res.status(500).json({
            success:false,
            message:"User could not be searched."
        });
        //throw new Error("User could not be searched.");
    }
}

/*
findFriends(req, res, next)
NAME
    findFriends
SYNOPSIS
    findFriends(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This function retrieves a list of friends for the current user.
    Friends are defined as users who are followed by the current user and are also following the current user.
    It constructs a query to find users who meet these criteria and excludes their password fields.
    Upon successful retrieval of friends, it responds with the list of friends.
    If no friends are found or an error occurs, it handles the error gracefully.
PARAMETERS
    - req: Request - Express request object containing the current user's ID.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the list of friends or an error message
    if no friends are found or an error occurs.
*/
exports.findFriends = async (req,res,next) => {
    try{
        //friends are users who are followed by the current user and the current user is followed by them
        const user = await User.findById(req.user.id);

        //if user is not found, send error message
        if(!user){
            res.status(404).json({success:false,message:"User not found"});
            return;
            //throw new Error("User not found");
        }

        //find users who are followed by the current user and the current user is followed by them
        const friends = await User.find({
            $and: [
                { _id: { $in: user.following } },
                { _id: { $in: user.followers } },
                ]
        }).select("-password");

        //if no friends are found, send error message
        if(friends.length == 0){
            res.status(404).json({success:false,message:"Friends not found"});
            return;
            //throw new Error("Friends not found");
        }
        
        //send response
        res.status(200).json({
            success:true,
            friends
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Friends could not be found."
        });
        //throw new Error("Friends could not be found.");
    }
}