import { FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAIL, CREATE_MESSAGE } from '../constants/messageConstants';


/*
messageReducer()
NAME
    messageReducer
SYNOPSIS
    messageReducer(state, action)
    - state: object - The current state of the message store.
    - action: object - An object containing the type and payload of the action being dispatched.
DESCRIPTION
    This function is a Redux reducer responsible for managing the state of messages in an application. It handles various actions related to messages, such as creating, fetching, and handling errors.

PARAMETERS
    - state (object): The current state of the message store, initialized with an empty array of messages.
    - action (object): An object containing the type and payload of the action being dispatched.

RETURNS
    An object representing the new state of the message store based on the action type.
*/

export const messageReducer = (state = {messages:[]}, action) => {
    switch(action.type){
        case CREATE_MESSAGE:
            return{
                ...state,
                messages:[...state.messages, action.payload]
            }
        case FETCH_MESSAGES_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case FETCH_MESSAGES_SUCCESS:
            return{
                ...state,
                loading:false,
                messages:action.payload
            }
        case FETCH_MESSAGES_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}

/*
/*
createMessageReducer()
NAME
    createMessageReducer
SYNOPSIS
    createMessageReducer(state, action)
    - state: object - The current state of the create message operation.
    - action: object - An object containing the type and payload of the action being dispatched.
DESCRIPTION
    This Redux reducer manages the state related to creating a new message. It handles the action of creating a message and updates the state with the created message.

PARAMETERS
    - state (object): The current state of the create message operation, typically initialized as an empty object.
    - action (object): An object containing the type and payload of the action being dispatched.

RETURNS
    An object representing the new state of the create message operation based on the action type.
*/

export const createMessageReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_MESSAGE:
            return{
                ...state,
                message : action.payload
            }
        case 'CREATE_MESSAGE_FAIL':
            return{
                ...state,
                error:action.payload
            }
        default:
            return state;
    }
}