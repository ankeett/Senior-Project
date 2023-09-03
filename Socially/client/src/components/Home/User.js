import React from 'react'
import { Paper,Link,Button } from '@mui/material';
import { useSelector } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { followUser,unfollowUser } from '../../actions/userAction';
import RemoveIcon from '@mui/icons-material/Remove';

/*
User()
NAME
    User
SYNOPSIS
    User({ search });
    search: Object - Represents the user data obtained from a search.
DESCRIPTION
    This React component displays information about a user obtained from a search result.
    It allows the current user to follow or unfollow the displayed user.
    The component includes a link to the user's profile.
PARAMETERS
    {Object} search - The user data obtained from a search.
RETURNS
    Returns a React component that renders user information and follow/unfollow buttons.
*/
const User = ({search}) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

  return (
    <Paper elevation={2} className='w-3/4 h-full flex flex-row justify-between items-center'>
    <Link href={`/profile/user/${search._id}`} className='no-underline'>
        <div className='flex flex-row items-center gap-5 p-4'>
            <img src={search.avatar.url} alt="" className='w-10 h-10 rounded-full' />
            <div className='flex flex-col -space-y-2'>
                <h4>@{search.username}</h4>
                <p>{search.name}</p>
            </div>
        </div>
    </Link>
    <div className='mr-5'>
        {/* If the current user is not the user being displayed, display follow/unfollow buttons. */}
        {
            user && user.user && user.user._id != search._id ?
            ( user.user.following.includes(search._id) ? (
                <Button className='text-[#1da1f2] normal-case bg-gray-100 rounded-full text-base w-1/8 border-[#1da1f2]' onClick={()=>{
                    dispatch(unfollowUser(search._id))
                    }}><RemoveIcon/>Unfollow</Button>
            ) : (
                <Button className='text-white bg-[#1da1f2] normal-case  rounded-full text-base w-1/8' onClick={()=>{
                    dispatch(followUser(search._id))
                    }}><AddIcon/>Follow</Button>
            ))
            : ''
        }

    </div>
</Paper>

  )
}

export default User