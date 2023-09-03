import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, Badge,Button } from '@mui/material';
import { findFriends } from '../../actions/userAction';
import { Link } from 'react-router-dom';


/*
Messages()
NAME
    Messages
SYNOPSIS
    Messages();
DESCRIPTION
    This React component represents the "Messages" section of your application.
    It displays a list of user friends for initiating private conversations.
    Users can click on a friend's name to navigate to a private message chat with them.
RETURNS
    Returns a React component that renders the "Messages" section.
*/
const Messages = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const friends = useSelector(state => state.friends);

  // Dispatch the "findFriends" action to fetch the user's friends.
  useEffect(() => {
    dispatch(findFriends());
  }, [dispatch]);


  return (
    <div>
      <strong className='font-semibold'>Messages</strong>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-3 w-3/4'>

          {
            friends && friends.friends && friends.friends.map((friend) => (
              <Card
                className='mt-5 p-3 cursor-pointer hover:mb-1 hover:font-semibold flex flex-row gap-2'
              >
                <Avatar>
                  <img src={friend.avatar.url} alt={friend.name} className='w-full h-full' />
                </Avatar>
                <Link to={`/message/${friend._id}`}><p>{friend.name}</p></Link>
              </Card>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Messages;
