import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { searchUser } from '../../actions/userAction';
import User from './User';

const Search = () => {
  const users = useSelector(state => state.users);

  const keyword = useParams().search;
  const dispatch = useDispatch();
  console.log(keyword);
  useEffect(() => {
    dispatch(searchUser(keyword));

  },[]);
  console.log(users)
  return (
    <div className='mx-auto w-3/4'>
        <h1 className='text-2xl font-bold'>Search</h1>
        <a href='/explore'>⬅︎ Back to explore</a>
        <div className='mt-3 flex flex-col gap-5'>
        {
            users && users.users.map((user)=>(
                <User user={user}/>
            ))
        }
        </div>
    </div>
  )
}

export default Search