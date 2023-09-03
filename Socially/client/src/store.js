/*
store.js
NAME
    store.js
SYNOPSIS
    Redux store configuration for managing application state.
DESCRIPTION
    This file sets up the Redux store by combining reducers, applying middleware (including thunk for asynchronous actions), and enhancing it with Redux DevTools for debugging.
PARAMETERS
    None.
RETURNS
    Configured Redux store for the application.
*/
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {userReducer,forgotPasswordReducer, postUserReducer,searchUserReducer,friendsReducer} from './reducers/userReducer'
import {postReducer, tagReducer} from './reducers/postReducer'
import {notificationReducer } from './reducers/notificationReducer';
import { messageReducer,createMessageReducer } from './reducers/messageReducer';


// Combine individual reducers into a single reducer
const reducer = combineReducers({
     user:userReducer,
     forgotPw: forgotPasswordReducer,
     posts: postReducer,
     poster: postUserReducer,
     tags: tagReducer,
     users:searchUserReducer,
     notifications:notificationReducer,
     friends:friendsReducer,
     messages: messageReducer,
     newMessage: createMessageReducer

});

// Initialize the Redux store with the combined reducer, initial state, and middleware
let initialState = {
   
};

// Apply middleware and enhance the store with Redux DevTools
const middlewares = [thunk];

// Create the Redux store with the combined reducer, initial state, and middleware
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;