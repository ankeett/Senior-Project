import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getPostsByTag } from '../../actions/postAction'
import { useParams } from 'react-router-dom'
import Post from '../Post/Post'

const PostsByTags = () => {
    const tag = useParams().id
    console.log(tag)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getPostsByTag(tag))
    },[dispatch])
    const {post} = useSelector(state=>state.posts)
    console.log(post)

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