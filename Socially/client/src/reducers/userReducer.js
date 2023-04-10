import {LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_FAIL, REGISTER_REQUEST
    , REGISTER_SUCCESS, LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS
    ,UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET,
    CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_RESET,
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS,
    UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS,
    DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS ,
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    ACTIVATE_SUCCESS, ACTIVATE_FAIL, ACTIVATE_REQUEST
} from "../constants/userConstants";

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
        default:
            return state;

    }
}

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