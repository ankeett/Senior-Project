import {
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL,
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL,
  FETCH_A_POST_REQUEST, FETCH_A_POST_SUCCESS, FETCH_A_POST_FAIL,
  UPDATE_A_POST_REQUEST, UPDATE_A_POST_SUCCESS, UPDATE_A_POST_FAIL,
  DELETE_A_POST_REQUEST, DELETE_A_POST_SUCCESS, DELETE_A_POST_FAIL, LIKE_A_POST_REQUEST, LIKE_A_POST_SUCCESS, LIKE_A_POST_FAIL
} from '../constants/postConstants';
import axios from 'axios';

export const postReducer = (state = {post:[]}, action) => {
    switch(action.type){
        case CREATE_POST_REQUEST:
        case FETCH_POSTS_REQUEST:
        case FETCH_A_POST_REQUEST:
        case UPDATE_A_POST_REQUEST:
        case DELETE_A_POST_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case CREATE_POST_SUCCESS:
        case FETCH_POSTS_SUCCESS:
        case FETCH_A_POST_SUCCESS:
        case UPDATE_A_POST_SUCCESS:
        case DELETE_A_POST_SUCCESS:
            return{
                ...state,
                loading:false,
                post:action.payload
            }
        case CREATE_POST_FAIL:
        case FETCH_POSTS_FAIL:
        case FETCH_A_POST_FAIL:
        case UPDATE_A_POST_FAIL:
        case DELETE_A_POST_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case LIKE_A_POST_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case LIKE_A_POST_SUCCESS:
            return{
                ...state,
                loading:false,
                post:action.payload
            }
        case LIKE_A_POST_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }}
