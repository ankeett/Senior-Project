import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {userReducer,forgotPasswordReducer} from './reducers/userReducer'


const reducer = combineReducers({
     user:userReducer,
     forgotPw: forgotPasswordReducer,
    // review:reviewReducer,
    // productRed:productReducer,
    // cart:cartReducer,s
    // orderRed:orderReducer

});

let initialState = {
   
};

const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;