import {
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL,
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAIL,
  FETCH_A_POST_REQUEST, FETCH_A_POST_SUCCESS, FETCH_A_POST_FAIL,
  UPDATE_A_POST_REQUEST, UPDATE_A_POST_SUCCESS, UPDATE_A_POST_FAIL, CREATE_A_COMMENT_FAIL, CREATE_A_COMMENT_REQUEST, CREATE_A_COMMENT_SUCCESS,
  DELETE_A_POST_REQUEST, DELETE_A_POST_SUCCESS, DELETE_A_POST_FAIL, LIKE_A_POST_FAIL, LIKE_A_POST_REQUEST, LIKE_A_POST_SUCCESS
} from '../constants/postConstants';

import { USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL } from '../constants/userConstants';

import axios from 'axios';

const host = "http://localhost:4000";


export const createPost = (content,tags,image,visibility) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_POST_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${host}/api/post/create`, {content,tags,image,visibility}, config);
        window.location.reload();
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
        const {data} = await axios.get(`${host}/api/posts/all`,config);
        dispatch({type:FETCH_POSTS_SUCCESS,payload:data.posts});
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

export const likePost = (id) => async (dispatch) => {
    try{
        console.log('like')
        dispatch({type:LIKE_A_POST_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.put(`${host}/api/post/like/${id}`,config);
        dispatch({type:LIKE_A_POST_SUCCESS,payload:data});
        console.log(data)
    }
    catch(error){
        dispatch({type:LIKE_A_POST_FAIL,payload:error.response.data.message});
    }
}

export const getUserPosts = (id) => async (dispatch) => {
    try{
        dispatch({type:FETCH_POSTS_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/post/user/${id}`,config);
        dispatch({type:FETCH_POSTS_SUCCESS,payload:data.posts});
    }
    catch(error){
        dispatch({type:FETCH_POSTS_FAIL,payload:error.response.data.message});
    }
}

export const getAPost = (id) => async (dispatch) => {
    try{
        dispatch({type:FETCH_A_POST_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/post/${id}`,config);
        dispatch({type:FETCH_A_POST_SUCCESS,payload:data.post});
    }
    catch(error){
        dispatch({type:FETCH_A_POST_FAIL,payload:error.response.data.message});
    }
}

export const popularTags = () => async (dispatch) => {
    try{
        dispatch({type:FETCH_TAGS_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/tags/popular`,config);
        console.log(data)
        dispatch({type:FETCH_TAGS_SUCCESS,payload:data.tags});
    }
    catch(error){
        dispatch({type:FETCH_TAGS_FAIL,payload:error.response.data.message});
    }
}

export const getPostsByTag = (tag) => async (dispatch) => {
    try{
        dispatch({type:FETCH_POSTS_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/tag/${tag}`,config);
        dispatch({type:FETCH_POSTS_SUCCESS,payload:data.posts});
    }
    catch(error){
        dispatch({type:FETCH_POSTS_FAIL,payload:error.response.data.message});
    }
}

export const getFollowingsPosts = () => async (dispatch) => {
    try{
        dispatch({type:FETCH_POSTS_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.get(`${host}/api/posts/following`,config);
        dispatch({type:FETCH_POSTS_SUCCESS,payload:data.posts});
    }
    catch(error){
        dispatch({type:FETCH_POSTS_FAIL,payload:error.response.data.message});
    }
}


export const updatePost = (id,content,tags,image,newImages,visibility) => async (dispatch) => {
    try{
        dispatch({type:UPDATE_A_POST_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.put(`${host}/api/post/update/${id}`,{content,tags,image,newImages,visibility},config);
        dispatch({type:UPDATE_A_POST_SUCCESS,payload:data.post});
        console.log('update post')

    }
    catch(error){
        dispatch({type:UPDATE_A_POST_FAIL,payload:error.response.data.message});
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        dispatch({type:DELETE_A_POST_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.delete(`${host}/api/post/delete/${id}`,config);
        window.location.reload();
        dispatch({type:DELETE_A_POST_SUCCESS,payload:data});

    }
    catch(error){
        dispatch({type:DELETE_A_POST_FAIL,payload:error.response.data.message});
    }
}

export const createComment = (id,comment) => async (dispatch) => {
    try{

        dispatch({type:CREATE_A_COMMENT_REQUEST});
        console.log("comment")
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.post(`${host}/api/comment/create/${id}`,{comment},config);
        dispatch({type:CREATE_A_COMMENT_SUCCESS,payload:data.post});
        window.location.reload();

    }
    catch(error){
        dispatch({type:CREATE_A_COMMENT_FAIL,payload:error.response.data.message});
    }  
}