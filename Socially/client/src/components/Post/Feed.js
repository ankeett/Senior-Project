import React,{useEffect} from 'react'
import Post from './Post'
import {getAllPosts, userDetails} from '../../actions/postAction'
import {useDispatch,useSelector} from 'react-redux'


/*
Feed()
NAME
    Feed
SYNOPSIS
    Feed();
DESCRIPTION
    This React component represents a feed of posts.
    It fetches and displays posts from the Redux store, sorted by their creation date.
RETURNS
    Returns a React component that renders a feed of posts.
*/
const Feed = () => {
    const dispatch = useDispatch()
    const {post} = useSelector(state=>state.posts)

    // Dispatch the "getAllPosts" action to fetch all posts.
    useEffect(()=>{
        dispatch(getAllPosts())
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

export default Feed