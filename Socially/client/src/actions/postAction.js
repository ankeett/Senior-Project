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


/*
createPost(content, tags, image, visibility)
NAME
    createPost
SYNOPSIS
    createPost(content, tags, image, visibility);
DESCRIPTION
    This Redux action creates a new post with the provided content, tags, images, and visibility settings.
PARAMETERS
    - content (string): The content or text of the post.
    - tags (array): An array of tags associated with the post.
    - image (array): An array of image URLs attached to the post.
    - visibility (string): The visibility setting for the post, either 'public' or 'private'.
RETURNS
    An asynchronous Redux action that dispatches 'CREATE_POST_SUCCESS' with the newly created post data upon success.
    In case of an error during the creation process, it dispatches 'CREATE_POST_FAIL' with an error message payload.
*/
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

/*
getAllPosts()
NAME
    getAllPosts
SYNOPSIS
    getAllPosts();
DESCRIPTION
    This Redux action fetches all posts available in the application.
PARAMETERS
    None.
RETURNS
    An asynchronous Redux action that dispatches 'FETCH_POSTS_SUCCESS' with an array of post data upon successful retrieval.
    In case of an error during the fetch process, it dispatches 'FETCH_POSTS_FAIL' with an error message payload.
*/
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

/*
userDetails()
NAME
    userDetails
SYNOPSIS
    userDetails(id);
DESCRIPTION
    This Redux action fetches user details based on the provided user ID.
PARAMETERS
    id - string: The user ID for which you want to fetch details.
RETURNS
    An asynchronous Redux action that dispatches 'USER_DETAILS_SUCCESS' with the user data upon successful retrieval.
    In case of an error during the fetch process, it dispatches 'USER_DETAILS_FAIL' with an error message payload.
*/
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
        dispatch({type:USER_DETAILS_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:USER_DETAILS_FAIL,payload:error.response.data.message});
    }
}

/*
likePost()
NAME
    likePost
SYNOPSIS
    likePost(id);
DESCRIPTION
    This Redux action allows a user to like a post by its ID.
PARAMETERS
    id - string: The ID of the post to be liked.
RETURNS
    An asynchronous Redux action that dispatches 'LIKE_A_POST_SUCCESS' when the post is successfully liked.
    In case of an error during the like operation, it dispatches 'LIKE_A_POST_FAIL' with an error message payload.
*/
export const likePost = (id) => async (dispatch) => {
    try{
        dispatch({type:LIKE_A_POST_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const {data} = await axios.put(`${host}/api/post/like/${id}`,config);
        dispatch({type:LIKE_A_POST_SUCCESS,payload:data});
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

/*
getAPost()
NAME
    getAPost
SYNOPSIS
    getAPost(id);
DESCRIPTION
    This Redux action allows fetching a specific post by its ID.
PARAMETERS
    id - string: The ID of the post to be fetched.
RETURNS
    An asynchronous Redux action that dispatches 'FETCH_A_POST_SUCCESS' with the post data when the post is successfully fetched.
    In case of an error during the fetch operation, it dispatches 'FETCH_A_POST_FAIL' with an error message payload.
*/
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

/*
popularTags()
NAME
    popularTags
SYNOPSIS
    popularTags();
DESCRIPTION
    This Redux action allows fetching a list of popular tags used in posts.
PARAMETERS
    None.
RETURNS
    An asynchronous Redux action that dispatches 'FETCH_TAGS_SUCCESS' with the list of popular tags when the tags are successfully fetched.
    In case of an error during the fetch operation, it dispatches 'FETCH_TAGS_FAIL' with an error message payload.
*/
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
        dispatch({type:FETCH_TAGS_SUCCESS,payload:data.tags});
    }
    catch(error){
        dispatch({type:FETCH_TAGS_FAIL,payload:error.response.data.message});
    }
}

/*
getPostsByTag()
NAME
    getPostsByTag
SYNOPSIS
    getPostsByTag(tag);
DESCRIPTION
    This Redux action allows fetching a list of posts associated with a specific tag.
PARAMETERS
    - tag (string): The tag for which to fetch related posts.
RETURNS
    An asynchronous Redux action that dispatches 'FETCH_POSTS_SUCCESS' with the list of posts related to the given tag when the posts are successfully fetched.
    In case of an error during the fetch operation, it dispatches 'FETCH_POSTS_FAIL' with an error message payload.
*/
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

/*
getFollowingsPosts()
NAME
    getFollowingsPosts
SYNOPSIS
    getFollowingsPosts();
DESCRIPTION
    This Redux action allows fetching a list of posts from users that the authenticated user is following.
PARAMETERS
    None.
RETURNS
    An asynchronous Redux action that dispatches 'FETCH_POSTS_SUCCESS' with the list of posts from followed users when the posts are successfully fetched.
    In case of an error during the fetch operation, it dispatches 'FETCH_POSTS_FAIL' with an error message payload.
*/
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

/*
updatePost()
NAME
    updatePost
SYNOPSIS
    updatePost(id, content, tags, image, newImages, visibility);
DESCRIPTION
    This Redux action allows updating an existing post with new content, tags, images, and visibility settings.
PARAMETERS
    id (string): The ID of the post to be updated.
    content (string): The updated content of the post.
    tags (array): An array of updated tags for the post.
    image (string): The updated main image URL for the post.
    newImages (array): An array of new image URLs to be added to the post.
    visibility (string): The updated visibility setting for the post (public or private).
RETURNS
    An asynchronous Redux action that dispatches 'UPDATE_A_POST_SUCCESS' with the updated post data when the post is successfully updated.
    In case of an error during the update operation, it dispatches 'UPDATE_A_POST_FAIL' with an error message payload.
*/
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
    }
    catch(error){
        dispatch({type:UPDATE_A_POST_FAIL,payload:error.response.data.message});
    }
}

/*
deletePost()
NAME
    deletePost
SYNOPSIS
    deletePost(id);
DESCRIPTION
    This Redux action allows deleting a post by its ID.
PARAMETERS
    id (string): The ID of the post to be deleted.
RETURNS
    An asynchronous Redux action that dispatches 'DELETE_A_POST_SUCCESS' when the post is successfully deleted.
    In case of an error during the deletion operation, it dispatches 'DELETE_A_POST_FAIL' with an error message payload.
*/
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

/*
createComment()
NAME
    createComment
SYNOPSIS
    createComment(id, comment);
DESCRIPTION
    This Redux action allows creating a new comment on a post with the given ID.
PARAMETERS
    id (string): The ID of the post to which the comment will be added.
    comment (string): The content of the new comment.
RETURNS
    An asynchronous Redux action that dispatches 'CREATE_A_COMMENT_SUCCESS' when the comment is successfully created.
    In case of an error during the comment creation, it dispatches 'CREATE_A_COMMENT_FAIL' with an error message payload.
*/
export const createComment = (id,comment) => async (dispatch) => {
    try{
        dispatch({type:CREATE_A_COMMENT_REQUEST});
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