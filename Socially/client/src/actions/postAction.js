import {
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL,
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL,
  FETCH_A_POST_REQUEST, FETCH_A_POST_SUCCESS, FETCH_A_POST_FAIL,
  UPDATE_A_POST_REQUEST, UPDATE_A_POST_SUCCESS, UPDATE_A_POST_FAIL,
  DELETE_A_POST_REQUEST, DELETE_A_POST_SUCCESS, DELETE_A_POST_FAIL,
} from '../constants/postConstants';

import { USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL } from '../constants/userConstants';

import axios from 'axios';

const host = "http://localhost:4000";

export const createPost = (description,tags) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_POST_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${host}/api/posts`, {description,tags}, config);
        dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_POST_FAIL, payload: error.response.data.message });
    }
}

export const getAllPosts = () => async (dispatch) => {
    try{
        dispatch({type:FETCH_POSTS_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/post/all`,config);
        dispatch({type:FETCH_POSTS_SUCCESS,payload:data.posts});
        console.log(data.posts)
    }
    catch(error){
        dispatch({type:FETCH_POSTS_FAIL,payload:error.response.data.message});
    }
}

export const userDetails = (id) => async (dispatch) => {
    try{
        dispatch({type:USER_DETAILS_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/post/user/${id}`,config);
        console.log(data)
        dispatch({type:USER_DETAILS_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:USER_DETAILS_FAIL,payload:error.response.data.message});
    }
}