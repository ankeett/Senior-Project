import React,{useEffect} from 'react'
import Post from './Post'
import {getAllPosts, getFollowingsPosts, userDetails} from '../../actions/postAction'
import {useDispatch,useSelector} from 'react-redux'

/*
Following()
NAME
    Following
SYNOPSIS
    Following();
DESCRIPTION
    This React component represents a feed of posts from followed users.
    It fetches and displays posts from the Redux store, sorted by their creation date,
    specifically for users that the current user is following.
RETURNS
    Returns a React component that renders a feed of posts from followed users.
*/
const Following = () => {
    const dispatch = useDispatch()
    const {post} = useSelector(state=>state.posts)

    // Dispatch the "getFollowingsPosts" action to fetch posts from followed users.
    useEffect(()=>{
        dispatch(getFollowingsPosts())
    },[dispatch])

  return (
      <div className='mt-3 flex flex-col gap-3'>
        {/* Display the posts, sorted by their creation date */}
        {
            post && post.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt)).map((p)=>(
                <Post key={p._id} p={p}/>
            ))
        }
    </div>
  )
}

export default Following