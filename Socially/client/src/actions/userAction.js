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
    ACTIVATE_SUCCESS, ACTIVATE_FAIL, ACTIVATE_REQUEST,
    FETCH_MY_REVIEW_SUCCESS, FETCH_MY_REVIEW_REQUEST, FETCH_MY_REVIEW_FAIL
} from "../constants/userConstants";

import axios from 'axios';

const host = "http://localhost:4000";

export const register = (name,email,password) => async(dispatch)=>{
    try{
        dispatch({type:"REGISTER_REQUEST"});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true,
        }

        const {data} = await axios.post(`${host}/api/register`,
            {name,email,password}
            ,config
        );
        
        await axios.post(
            `${host}/api/account/sendactivate`,
            {email},
            config
        )
        console.log('sdf')
        dispatch({type:"REGISTER_SUCCESS",payload:data.user});
            
    }
    catch(error){
        dispatch({type:"REGISTER_FAIL",payload:error.response.data.message});
    }
}

export const login = (email,password) => async(dispatch)=>{
    try{
        dispatch({type:"LOGIN_REQUEST"});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }

        const {data} = await axios.post(`${host}/api/login`,
            {email,password}
            ,config
        );
        console.log('sdf')

        dispatch({type:"LOGIN_SUCCESS",payload:data.user});
        console.log('login success')

    }
    catch(error){
        dispatch({type:"LOGIN_FAIL",payload:error.response.data.message});
    }
}

export const activateAccount = (token) => async(dispatch)=>{
    try{
        dispatch({type:"ACTIVATE_REQUEST"});
        const {data} = await axios.put(`${host}/api/account/activate/${token}`);
        dispatch({type:"ACTIVATE_SUCCESS",payload:data.user});
    }
    catch(error){
        dispatch({type:"ACTIVATE_FAIL",payload:error.response.data.message});
    }
    
}

export const forgotPassword = (email) => async(dispatch)=>{
    try{
        console.log(email)
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }

        const {data} = await axios.post(`${host}/api/account/forgotpassword`,
            {email}
            ,config
        );
        console.log("data")
        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data.message});

    }
    catch(error){
        dispatch({type:FORGOT_PASSWORD_FAIL,payload:error.response.data.message});

    }
}

export const resetPassword = (token,password) => async(dispatch)=>{
    try{
        dispatch({type:RESET_PASSWORD_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }
        const {data}= await axios.put(`${host}/api/account/resetpassword/${token}`,{password},config);
        console.log('reset password try')
        dispatch({type:RESET_PASSWORD_SUCCESS,payload:data.success});
        console.log('reset password success')
    }
    catch(error){
        dispatch({type:RESET_PASSWORD_FAIL,payload:error.response.data.message});
    }
}

export const changePassword = (prevPassword,newPassword) => async(dispatch)=>{
    try{
        console.log('change password request')
        dispatch({type:CHANGE_PASSWORD_REQUEST});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }
        const {data}= await axios.put(`${host}/api/account/changePassword`,{prevPassword,newPassword},config);
        console.log('change password try')
        dispatch({type:CHANGE_PASSWORD_SUCCESS,payload:data.success});
    }
    catch(error){
        dispatch({type:CHANGE_PASSWORD_FAIL,payload:error.response.data.message});
    }
}
