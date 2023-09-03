import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { searchUser } from '../../actions/userAction';
import User from './User';

/*
Search()
NAME
    Search
SYNOPSIS
    Search();
DESCRIPTION
    This React component represents the search page of your application.
    It allows users to search for other users by keyword and displays
    a list of users matching the search criteria.
RETURNS
    Returns a React component that renders the search page.
*/
const Search = () => {
  const users = useSelector(state => state.users);
  const keyword = useParams().search;
  const dispatch = useDispatch();

  // Dispatch the "searchUser" action to search for users.
  useEffect(() => {
    dispatch(searchUser(keyword));
  },[]);
  return (
    <div className='mx-auto w-3/4'>
        <h1 className='text-2xl font-bold'>Search</h1>
        <a href='/home'>⬅︎ Back to Home</a>
        <div className='mt-3 flex flex-col gap-5'>
        {
            users && users.users.map((user)=>(
                <User search={user}/>
            ))
        }
        {
            users && users.users.length == 0 ? (
                <h1 className='text-xl font-bold'>No users found</h1>
            ) : ''
        }
        </div>
    </div>
  )
}

export default Search