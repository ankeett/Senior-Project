import { createNotification } from "./notificationAction";
import {CLEAR_ERRORS,LOAD_SUCCESS, LOAD_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS,CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS,
    ALL_FRIENDS_FAIL, ALL_FRIENDS_REQUEST, ALL_FRIENDS_SUCCESS,LOAD_REQUEST,LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAIL,ACTIVATE_REQUEST,ACTIVATE_SUCCESS,ACTIVATE_FAIL
} from "../constants/userConstants";

import axios from 'axios';

const host = "http://localhost:4000";

/*
register()
NAME
    register
SYNOPSIS
    register(name, username, email, password, avatar);
DESCRIPTION
    This Redux action allows a user to register a new account with the provided user details.
PARAMETERS
    name (string): The user's full name.
    username (string): The desired username for the new account.
    email (string): The user's email address.
    password (string): The user's chosen password.
    avatar (string): The URL or file path of the user's avatar image (optional).
RETURNS
    An asynchronous Redux action that dispatches 'REGISTER_SUCCESS' when the registration is successful,
    along with the user object as payload.
    In case of an error during registration, it dispatches 'REGISTER_FAIL' with an error message payload.
*/
export const register = (name,username,email,password,avatar) => async(dispatch)=>{
    try{
        dispatch({type:REGISTER_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true,
        }

        const {data} = await axios.post(`${host}/api/register`,
            {name,username,email,password,avatar}
            ,config
        );
        
        await axios.post(
            `${host}/api/account/sendactivate`,
            {email},
            config
        )
        dispatch({type:REGISTER_SUCCESS,payload:data.user});
            
    }
    catch(error){
        dispatch({type:REGISTER_FAIL,payload:error.response.data.message});
    }
}

/*
login()
NAME
    login
SYNOPSIS
    login(email, password);
DESCRIPTION
    This Redux action allows a user to log in with their email and password, authenticating them.
PARAMETERS
    email (string): The user's email address.
    password (string): The user's password.
RETURNS
    An asynchronous Redux action that dispatches 'LOGIN_SUCCESS' when the login is successful,
    along with the user object as payload.
    In case of an error during login, it dispatches 'LOGIN_FAIL' with an error message payload.
*/
export const login = (email,password) => async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }

        const {data} = await axios.post(`${host}/api/login`,
            {email,password}
            ,config
        );
        dispatch({type:LOGIN_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message});
    }
}

/*
activateAccount()
NAME
    activateAccount
SYNOPSIS
    activateAccount(token);
DESCRIPTION
    This Redux action allows a user to activate their account using a provided activation token.
PARAMETERS
    token (string): The activation token received by the user.
RETURNS
    An asynchronous Redux action that dispatches 'ACTIVATE_SUCCESS' when the account activation is successful,
    along with the user object as payload.
    In case of an error during activation, it dispatches 'ACTIVATE_FAIL' with an error message payload.
*/
export const activateAccount = (token) => async(dispatch)=>{
    try{
        dispatch({type:ACTIVATE_REQUEST});
        const {data} = await axios.put(`${host}/api/account/activate/${token}`);
        dispatch({type:ACTIVATE_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:ACTIVATE_FAIL,payload:error.response.data.message});
    }
}

/*
forgotPassword()
NAME
    forgotPassword
SYNOPSIS
    forgotPassword(email);
DESCRIPTION
    This Redux action initiates the process of resetting a user's password by sending a password reset email to the specified email address.
PARAMETERS
    email (string): The email address for which the password reset is requested.
RETURNS
    An asynchronous Redux action that dispatches 'FORGOT_PASSWORD_SUCCESS' when the password reset email is successfully sent,
    along with a success message payload.
    In case of an error during the password reset request, it dispatches 'FORGOT_PASSWORD_FAIL' with an error message payload.
*/
export const forgotPassword = (email) => async(dispatch)=>{
    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }

        const {data} = await axios.post(`${host}/api/account/forgotpassword`,
            {email}
            ,config
        );
        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data.message});

    }
    catch(error){
        dispatch({type:FORGOT_PASSWORD_FAIL,payload:error.response.data.message});

    }
}

/*
resetPassword()
NAME
    resetPassword
SYNOPSIS
    resetPassword(token, password);
DESCRIPTION
    This Redux action allows a user to reset their password by providing a valid reset token and a new password.
PARAMETERS
    token (string): The unique token sent to the user's email for password reset verification.
    password (string): The new password the user wants to set.
RETURNS
    An asynchronous Redux action that dispatches 'RESET_PASSWORD_SUCCESS' when the password reset is successful,
    along with a success message payload.
    In case of an error during the password reset, it dispatches 'RESET_PASSWORD_FAIL' with an error message payload.
*/
export const resetPassword = (token,password) => async(dispatch)=>{
    try{
        dispatch({type:RESET_PASSWORD_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }
        const {data}= await axios.put(`${host}/api/account/resetpassword/${token}`,{password},config);
        dispatch({type:RESET_PASSWORD_SUCCESS,payload:data.success});
    }
    catch(error){
        dispatch({type:RESET_PASSWORD_FAIL,payload:error.response.data.message});
    }
}


/*
changePassword()
NAME
    changePassword
SYNOPSIS
    changePassword(prevPassword, newPassword);
DESCRIPTION
    This Redux action allows a user to change their password by providing their previous password and a new password.
PARAMETERS
    prevPassword (string): The user's current or previous password for verification.
    newPassword (string): The new password the user wants to set.
RETURNS
    An asynchronous Redux action that dispatches 'CHANGE_PASSWORD_SUCCESS' when the password change is successful,
    along with a success message payload.
    In case of an error during the password change, it dispatches 'CHANGE_PASSWORD_FAIL' with an error message payload.
*/
export const changePassword = (prevPassword,newPassword) => async(dispatch)=>{
    try{
        dispatch({type:CHANGE_PASSWORD_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }
        const {data}= await axios.put(`${host}/api/account/changePassword`,{prevPassword,newPassword},config);
        dispatch({type:CHANGE_PASSWORD_SUCCESS,payload:data.success});
    }
    catch(error){
        dispatch({type:CHANGE_PASSWORD_FAIL,payload:error.response.data.message});
    }
}
/*
loadUser()
NAME
    loadUser
SYNOPSIS
    loadUser();
DESCRIPTION
    This Redux action is used to load the user's information, such as their profile details and authentication status.
PARAMETERS
    None.
RETURNS
    An asynchronous Redux action that dispatches 'LOAD_SUCCESS' when the user's information is successfully loaded,
    along with the user data payload.
    If there's an error during the loading process, it dispatches 'LOAD_FAIL' with an error message payload.
*/
export const loadUser = () => async(dispatch)=>{
    try{
        dispatch({type:LOAD_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/me`,config);
        dispatch({type:LOAD_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:LOAD_FAIL,payload:error.response.data.message});
    }
}

/*
logout()
NAME
    logout
SYNOPSIS
    logout();
DESCRIPTION
    This Redux action is used to log the user out by sending a request to the server to invalidate the user's session.
PARAMETERS
    None.
RETURNS
    An asynchronous Redux action that dispatches 'LOGOUT_SUCCESS' when the user is successfully logged out.
    If there's an error during the logout process, it dispatches 'LOGOUT_FAIL' with an error message payload.
*/
export const logout = () => async (dispatch) => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/user/logout`,config);
        dispatch({type:LOGOUT_SUCCESS})
    }
    catch(error){
        dispatch({type:LOGOUT_FAIL,payload:error.response.data.message});
    }
}

/*
followUser(id)
NAME
    followUser
SYNOPSIS
    followUser(id);
    id -> string - the ID of the user to follow.
DESCRIPTION
    This Redux action is used to follow another user. It sends a request to the server to establish a follow relationship
    between the authenticated user and the user with the specified ID.
PARAMETERS
    id (string) - The ID of the user to follow.
RETURNS
    An asynchronous Redux action that dispatches 'LOAD_SUCCESS' when the follow operation is successful.
    If there's an error during the follow operation, it dispatches 'LOAD_FAIL' with an error message payload.
*/
export const followUser = (id) => async(dispatch)=>{
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.put(`${host}/api/follow/${id}`,{},config);
        //recipient, sender, message, link 
        dispatch(createNotification(
            id,
            data.user._id,
            `${data.user.name} started following you`,
            `/profile/user/${data.user._id}`
        ))
        dispatch({type:LOAD_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:LOAD_FAIL,payload:error.response.data.message});
    }
}

/*
unfollowUser(id)
NAME
    unfollowUser
SYNOPSIS
    unfollowUser(id);
    id -> string - the ID of the user to unfollow.
DESCRIPTION
    This Redux action is used to unfollow another user. It sends a request to the server to remove the follow relationship
    between the authenticated user and the user with the specified ID.
PARAMETERS
    id (string) - The ID of the user to unfollow.
RETURNS
    An asynchronous Redux action that dispatches 'LOAD_SUCCESS' when the unfollow operation is successful.
    If there's an error during the unfollow operation, it dispatches 'LOAD_FAIL' with an error message payload.
*/
export const unfollowUser = (id) => async(dispatch)=>{
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.put(`${host}/api/unfollow/${id}`,{},config);
        dispatch({type:LOAD_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:LOAD_FAIL,payload:error.response.data.message});
    }
}

/*
clearErrors()
NAME
    clearErrors
SYNOPSIS
    clearErrors();
DESCRIPTION
    This Redux action is used to clear any error messages in the application's state. It's typically dispatched after an
    error occurs to ensure that previous error messages do not persist in the state.
PARAMETERS
    None.
RETURNS
    An action that dispatches 'CLEAR_ERRORS' to clear any error messages in the state.
*/
export const clearErrors = () => async(dispatch)=>{
   dispatch({type:CLEAR_ERRORS});
}

/*
searchUser(keyword)
NAME
    searchUser
SYNOPSIS
    searchUser(keyword);
    keyword -> string - The keyword or search query used to find users.
DESCRIPTION
    This Redux action is used to search for users based on a provided keyword or search query. It dispatches an API request
    to search for users matching the given keyword and updates the application's state with the search results.
PARAMETERS
    - keyword (string): The keyword or search query used to find users.
RETURNS
    An asynchronous action that dispatches 'ALL_USERS_REQUEST', 'ALL_USERS_SUCCESS', or 'ALL_USERS_FAIL' based on the outcome of the search operation.
*/
export const searchUser = (keyword) => async(dispatch)=>{
    try{
        dispatch({type:ALL_USERS_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/search/${keyword}`,config);
        dispatch({type:ALL_USERS_SUCCESS,payload:data.users});
    }
    catch(error){
        dispatch({type:ALL_USERS_FAIL,payload:error.response.data.message});
    }
}

/*
findFriends()
NAME
    findFriends
SYNOPSIS
    findFriends();
DESCRIPTION
    This Redux action is used to retrieve a user's friends. It dispatches an API request to fetch a list of the user's friends
    and updates the application's state with the results.
RETURNS
    An asynchronous action that dispatches 'ALL_FRIENDS_REQUEST', 'ALL_FRIENDS_SUCCESS', or 'ALL_FRIENDS_FAIL' based on the
    outcome of the friend retrieval operation.
*/
export const findFriends = () => async(dispatch)=>{
    try{
        dispatch({type:ALL_FRIENDS_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/user/friends`,config);
        dispatch({type:ALL_FRIENDS_SUCCESS,payload:data.friends});
    }
    catch(error){
        dispatch({type:ALL_FRIENDS_FAIL,payload:error.response.data.message});
    }
}