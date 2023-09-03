import axios from 'axios';
import { CREATE_MESSAGE, FETCH_MESSAGES_SUCCESS, CREATE_MESSAGE_FAIL, FETCH_MESSAGES_FAIL, FETCH_MESSAGES_REQUEST } from '../constants/messageConstants';

const host = "http://localhost:4000";


/*
createMessage()
NAME
    createMessage
SYNOPSIS
    createMessage(receiver, message)
    - receiver: string - the recipient's user ID or username
    - message: string - the message content to send
DESCRIPTION
    This Redux action sends a new message to a specified recipient. It makes an API request to create a new message with the given receiver and message content.
PARAMETERS
    - receiver: The user ID or username of the message recipient.
    - message: The content of the message to send.
RETURNS
    An asynchronous Redux action that dispatches a 'CREATE_MESSAGE' action upon success.
*/
export const createMessage = (receiver, message) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${host}/api/message/create`, { receiver, message }, config);
        dispatch({ type: CREATE_MESSAGE, payload: data });
        window.location.reload();
    } catch (error) {
        console.log(error);
        dispatch({ type: CREATE_MESSAGE_FAIL, payload: error });
    }
}

/*
getMessages()
NAME
    getMessages
SYNOPSIS
    getMessages()
DESCRIPTION
    This Redux action fetches the user's messages from the server. It makes an API request to retrieve the user's messages.
RETURNS
    An asynchronous Redux action that dispatches a 'FETCH_MESSAGES_SUCCESS' action upon success, containing the fetched messages.
*/
export const getMessages = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_MESSAGES_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.get(`${host}/api/messages`, config);
        dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: data.messages });
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_MESSAGES_FAIL, payload: error });
    }
}
/*
getConversation(id)
NAME
    getConversation
SYNOPSIS
    getConversation(id);
    - id: string - The unique identifier of the conversation.
DESCRIPTION
    This Redux action fetches a specific conversation between the current user and another user by its unique identifier.
    It makes an API request to retrieve the messages within that conversation.
PARAMETERS
    - id: string - The unique identifier of the conversation to fetch.
RETURNS
    An asynchronous Redux action that dispatches 'FETCH_MESSAGES_REQUEST' when the request is initiated,
    'FETCH_MESSAGES_SUCCESS' upon successful retrieval of messages, or 'FETCH_MESSAGES_FAIL' if there's an error.
*/
export const getConversation = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_MESSAGES_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.get(`${host}/api/conversation/${id}`, config);
        dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: data.messages });
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_MESSAGES_FAIL, payload: error });
    }
}

