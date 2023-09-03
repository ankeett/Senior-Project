import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { loadUser } from '../../actions/userAction'
import { getAllPosts } from '../../actions/postAction'

/*
LoadDetails()
NAME
    LoadDetails
SYNOPSIS
    LoadDetails();
DESCRIPTION
    This React component loads the user.
    It fetches the user data from the Redux store and dispatches the "loadUser" action.
RETURNS
    Returns an empty div as its pupoes is to load the user.
*/
const LoadDetails = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)
    const {post} = useSelector(state=>state.posts)

    useEffect(()=>{
        dispatch(loadUser())
      },[dispatch])

  return (
    <div>
        
    </div>
  )
}

export default LoadDetails