import {
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL,
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL,
  FETCH_A_POST_REQUEST, FETCH_A_POST_SUCCESS, FETCH_A_POST_FAIL,
  UPDATE_A_POST_REQUEST, UPDATE_A_POST_SUCCESS, UPDATE_A_POST_FAIL,
  DELETE_A_POST_REQUEST, DELETE_A_POST_SUCCESS, DELETE_A_POST_FAIL,
} from '../constants/postConstants';

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
        dispatch({ type: CREATE_POST_SUCCESS, payload: data.post });
    } catch (error) {
        dispatch({ type: CREATE_POST_FAIL, payload: error.response.data.message });
    }
}