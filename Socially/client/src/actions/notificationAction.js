import axios from 'axios';

import {CREATE_NOTIFICATION, FETCH_NOTIFICATIONS_SUCCESS, GET_NOTIFICATION, CREATE_NOTIFICATION_FAIL, FETCH_NOTIFICATIONS_FAIL, FETCH_NOTIFICATIONS_REQUEST} from '../constants/notificationConstants';

const host = "http://localhost:4000";


/*
createNotification(recipient, sender, message, link)
NAME
    createNotification
SYNOPSIS
    createNotification(recipient, sender, message, link);
    - recipient: string - The recipient's user identifier.
    - sender: string - The sender's user identifier.
    - message: string - The notification message content.
    - link: string - The URL link associated with the notification.
DESCRIPTION
    This Redux action creates a new notification and sends it to the specified recipient. Notifications are typically used
    to inform users about events or updates in the application.
PARAMETERS
    - recipient: string - The user identifier of the notification recipient.
    - sender: string - The user identifier of the notification sender.
    - message: string - The content of the notification message.
    - link: string - The URL link associated with the notification (e.g., a link to a specific post).
RETURNS
    An asynchronous Redux action that dispatches 'CREATE_NOTIFICATION' when the notification is successfully created,
    or 'CREATE_NOTIFICATION_FAIL' if there's an error.
*/
export const createNotification = (recipient, sender, message, link) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${host}/api/notification/create`, { recipient, sender, message, link }, config);
        dispatch({ type: CREATE_NOTIFICATION, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: CREATE_NOTIFICATION_FAIL, payload: error });
    }
}

/*
getNotifications()
NAME
    getNotifications
SYNOPSIS
    getNotifications();
DESCRIPTION
    This Redux action retrieves notifications for the currently authenticated user. Notifications typically represent
    updates, messages, or activities related to the user's account or interactions within the application.
PARAMETERS
    None.
RETURNS
    An asynchronous Redux action that dispatches 'FETCH_NOTIFICATIONS_REQUEST' while fetching notifications, and
    'FETCH_NOTIFICATIONS_SUCCESS' with the retrieved notifications data upon success. In case of an error during the
    retrieval process, it dispatches 'FETCH_NOTIFICATIONS_FAIL' with an error payload.
*/
export const getNotifications = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.get(`${host}/api/notifications`, config);
        dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: data.notifications });
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_NOTIFICATIONS_FAIL, payload: error });
    }
}

/*
getNotification(id)
NAME
    getNotification
SYNOPSIS
    getNotification(id);
DESCRIPTION
    This Redux action retrieves a specific notification by its ID for the currently authenticated user.
PARAMETERS
    - id (string): The ID of the notification to retrieve.
RETURNS
    An asynchronous Redux action that dispatches 'FETCH_NOTIFICATIONS_SUCCESS' with the retrieved notification data upon success.
    In case of an error during the retrieval process, it dispatches 'FETCH_NOTIFICATIONS_FAIL' with an error payload.
*/
export const getNotification = (id) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.get(`${host}/api/notification/${id}` , config);
        dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_NOTIFICATIONS_FAIL, payload: error });
    }
}