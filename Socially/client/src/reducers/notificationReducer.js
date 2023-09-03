import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAIL,
    CREATE_NOTIFICATION,
    CREATE_NOTIFICATION_FAIL
} from "../constants/notificationConstants";

/*
notificationReducer()
NAME
    notificationReducer
SYNOPSIS
    notificationReducer(state, action)
    - state: object - The current state of notifications.
    - action: object - An object containing the type and payload of the action being dispatched.
DESCRIPTION
    This Redux reducer manages the state related to notifications. It handles actions like fetching notifications, creating new notifications, and updating the state accordingly.

PARAMETERS
    - state (object): The current state of notifications, typically initialized with an empty array.
    - action (object): An object containing the type and payload of the action being dispatched.

RETURNS
    An object representing the new state of notifications based on the action type.
*/
export const notificationReducer = (state = {notifications:[]}, action) => {
    switch(action.type){
        case FETCH_NOTIFICATIONS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case FETCH_NOTIFICATIONS_SUCCESS:
            return{
                ...state,
                loading:false,
                notifications:action.payload
            }
        case FETCH_NOTIFICATIONS_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CREATE_NOTIFICATION:
            return{
                ...state,
                notifications:[...state.notifications, action.payload]
            }
        case CREATE_NOTIFICATION_FAIL:
            return{
                ...state,
                error:action.payload
            }
        
        default:
            return state;
    }
}

