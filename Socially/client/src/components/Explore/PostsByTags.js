import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getPostsByTag } from '../../actions/postAction'
import { useParams } from 'react-router-dom'
import Post from '../Post/Post'

/*
PostsByTags()
NAME
    PostsByTags
SYNOPSIS
    PostsByTags();
DESCRIPTION
    This React component displays posts associated with a specific tag.
    It fetches posts by the tag ID and renders them.
RETURNS
    Returns a React component that renders posts by a specific tag.
*/
const PostsByTags = () => {
    // Get the tag ID from the route parameters
    const tag = useParams().id
    const dispatch = useDispatch()

    // Dispatch the "getPostsByTag" action to fetch posts by the tag
    useEffect(()=>{
        dispatch(getPostsByTag(tag))
    },[dispatch])
    const {post} = useSelector(state=>state.posts)

  return (
    <div className='mx-auto w-3/4'>
        <h1 className='text-2xl font-bold'>Posts by "{tag}"</h1>
        <a href='/explore'>⬅︎ Back to explore</a>
        <div className='mt-3 flex flex-col gap-5'>
        {
            post && post.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt)).map((p)=>(
                <Post key={p._id} p={p}/>
            ))

        }
        </div>
    </div>
  )
}

export default PostsByTags