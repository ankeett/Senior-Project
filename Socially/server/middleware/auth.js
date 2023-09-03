const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/*
isAuthenticatedUser(req, res, next)
NAME
    isAuthenticatedUser
SYNOPSIS
    isAuthenticatedUser(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for allowing authenticated users.
DESCRIPTION
    This middleware function checks if the incoming request is associated with an authenticated user.
    It verifies the user's authentication token stored in a cookie and ensures it is not expired.
    If the token is valid and the associated user is found, it attaches the user to the request object for further processing.
    If the token is missing, expired, invalid, or the user is not found, it responds with an appropriate error message.
PARAMETERS
    - req: Request - Express request object containing the user's authentication token in cookies.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for allowing authenticated users to proceed.
RETURNS
    This middleware either attaches the authenticated user to the request object or sends an error response.
*/
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    //get the token from the cookies
    const { token } = req.cookies;

    //check if the token exists
    if (!token) {
      return res.status(401).json({ success: false, message: 'Please login to continue' });
    }
    //verify the token
    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

      //check if the token has expired
      if (decodedUser.exp < Date.now() / 1000) {
        return res.status(401).json({ success: false, message: 'Token has expired' });
      }
      //attach the user to the request object
      req.user = await User.findById(decodedUser.id);
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      next();
    } catch (error) {
      //if the token is invalid
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  } catch (error) {
    //if an error occurs during the operation return an error response
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
