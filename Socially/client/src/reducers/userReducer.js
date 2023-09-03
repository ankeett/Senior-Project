import {LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_FAIL, REGISTER_REQUEST
    , REGISTER_SUCCESS, LOAD_REQUEST, LOAD_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS,
    CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, 
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS,
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    ACTIVATE_SUCCESS, ACTIVATE_FAIL, ACTIVATE_REQUEST, ALL_FRIENDS_FAIL, ALL_FRIENDS_REQUEST, ALL_FRIENDS_SUCCESS
} from "../constants/userConstants";

/*
userReducer()
NAME
    userReducer
SYNOPSIS
    userReducer(state, action)
    - state: object - The current state of the user and related actions.
    - action: object - An object containing the type and payload of the action being dispatched.
DESCRIPTION
    This Redux reducer manages the state related to user authentication, user data, and related actions.

PARAMETERS
    - state (object): The current state of the user and related actions, typically initialized with an empty object for user data and loading/error flags.
    - action (object): An object containing the type and payload of the action being dispatched.

RETURNS
    An object representing the new state of user-related data and actions based on the action type.
*/

export const userReducer = (state = {user:{}}, action) => {
    switch(action.type){

        case LOAD_REQUEST:
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return{
                ...state,
                loading:true,
                isAuthenticated:false
            }
        
        case LOAD_SUCCESS:
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
                success:true
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error: action.payload
            }
        
        case ACTIVATE_REQUEST:
            return{
                ...state,
                loading:true,
                isActivated:false
            }

        case ACTIVATE_SUCCESS:
            return{
                ...state,
                loading:false,
                isActivated:true,
                user:action.payload,
                success:true
            }
        case ACTIVATE_FAIL:
            return{
                ...state,
                loading:false,
                isActivated:false,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                success:true
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;

    }
}

/*
forgotPasswordReducer()
NAME
    forgotPasswordReducer
SYNOPSIS
    forgotPasswordReducer(state, action)
    - state: object - The current state of forgot password and related actions.
    - action: object - An object containing the type and payload of the action being dispatched.
DESCRIPTION
    This Redux reducer manages the state related to the forgot password feature, including requesting a password reset and changing the password.

PARAMETERS
    - state (object): The current state of forgot password and related actions, typically initialized with an empty object for loading, error, message, and success flags.
    - action (object): An object containing the type and payload of the action being dispatched.

RETURNS
    An object representing the new state of forgot password-related data and actions based on the action type.
*/
export const forgotPasswordReducer = (state = {}, action) => {
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            }
        case FORGOT_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                message:action.payload
            }
        case FORGOT_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case RESET_PASSWORD_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            }
        case RESET_PASSWORD_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                success:action.payload
            }
        case RESET_PASSWORD_FAIL:
        case CHANGE_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        
        default:
            return state;
    }
}



export const postUserReducer = (state = {poster:{}}, action) => {
    switch(action.type){
        case USER_DETAILS_REQUEST:
                return{
                    ...state,
                    loading:true,
                    error:null
                }
            case USER_DETAILS_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    poster:action.payload
                }
            case USER_DETAILS_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
        default:
            return state;
    }
}

/*
postUserReducer()
NAME
    postUserReducer
SYNOPSIS
    postUserReducer(state, action)
    - state: object - The current state of user details for post author.
    - action: object - An object containing the type and payload of the action being dispatched.
DESCRIPTION
    This Redux reducer manages the state related to user details for the author of a post.

PARAMETERS
    - state (object): The current state of user details for the post author, typically initialized with an empty object for loading, error, and user details.
    - action (object): An object containing the type and payload of the action being dispatched.

RETURNS
    An object representing the new state of user details for the post author based on the action type.
*/
export const searchUserReducer = (state = {users:[]}, action) => {
    switch(action.type){
        case ALL_USERS_REQUEST:
                return{
                    ...state,
                    loading:true,
                    error:null
                }
            case ALL_USERS_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    users:action.payload
                }
            case ALL_USERS_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
        default:
            return state;
    }
}

export const friendsReducer = (state = {friends:[]}, action) => {
    switch(action.type){
        case ALL_FRIENDS_REQUEST:
                return{
                    ...state,
                    loading:true,
                    error:null
                }
            case ALL_FRIENDS_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    friends:action.payload
                }
            case ALL_FRIENDS_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
        default:
            return state;
    }
}