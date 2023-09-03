import { TextField,Button,InputAdornment,IconButton } from '@mui/material'
import React, { useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getConversation,createMessage } from '../../actions/messageAction'

import SendIcon from '@mui/icons-material/Send';

/*
MessageBubble()
NAME
    MessageBubble
SYNOPSIS
    MessageBubble({ message, isCurrentUser });
DESCRIPTION
    This React component represents a message bubble in a conversation.
    It displays a single message within the conversation thread.
PARAMETERS
    - message: Object representing a message with properties like sender, content, etc.
    - isCurrentUser: A boolean indicating whether the message was sent by the current user.
RETURNS
    Returns a React component that renders a message bubble within a conversation.
*/
const MessageBubble = ({ message, isCurrentUser }) => {

    return (
        <div
            className={`flex items-start justify-start px-4 py-1 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
            <div
                className={`rounded-lg p-2 ${isCurrentUser ? 'bg-blue-500' : 'bg-gray-300'} ${isCurrentUser ? 'rounded-bl-none' : 'rounded-br-none'} ${isCurrentUser ? 'mr-2' : 'ml-2'}`}
            >
                <p className={`text-sm ${isCurrentUser ? 'text-white' : 'text-black'}`}>{message.message}</p>
            </div>
        </div>
    );
};

/*
Conversation()
NAME
    Conversation
SYNOPSIS
    Conversation();
DESCRIPTION
    This React component represents a conversation between users.
    It displays a list of messages in a chat-like format.
    Users can send new messages in the conversation.
PARAMETERS
    None
RETURNS
    Returns a React component that renders a conversation interface.
*/
const Conversation = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const [messageTerm, setmessageTerm] = useState("");
    const messages = useSelector((state) => state.messages)
    
    useEffect(() => {
        dispatch(getConversation(id))
    }, [dispatch])

    const {user} = useSelector((state) => state.user);
    
  return (
    <div class="flex flex-col min-h-screen">
    <div class="flex-grow"></div> 

    <div>
        {user && user._id &&  messages && messages.messages && messages.messages.map((message) => {
            return (
                <MessageBubble
                    key={message._id}
                    message={message}
                    isCurrentUser={message.sender._id === user._id ? true : false}
                />
            )}
        )}
    </div>
    <div class="py-4 bg-gray-100 border-t">
    <TextField size='small' className='w-3/4 ml-4 mt-10' label="Search" value={messageTerm} onChange={(e) => setmessageTerm(e.target.value)}
                onKeyPress={(e)=>{
                    if(e.key === 'Enter'){
                        dispatch(createMessage(id,messageTerm))
                    }
                }}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position="end">
                                <IconButton
                                >
                                    <SendIcon onClick={()=>{
                                        //call function that dispatches search
                                        dispatch(createMessage(id,messageTerm))
                                    }}/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }} 
                />
    </div>
</div>
  )
}

export default Conversation