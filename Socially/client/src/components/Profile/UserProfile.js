import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getUserPosts } from '../../actions/postAction'
import Post from '../Post/Post'
import { useParams } from 'react-router-dom'


const Profile = () => {

  //load user details
  //load user posts
  //load user followers
  //load user following
  const id = useParams().id;
  const {post} = useSelector(state => state.posts)

  const dispatch = useDispatch()

  useEffect(() => {
    //load user post
    dispatch(getUserPosts(id))

  }, [dispatch])

  return (
    <div>
      <a href='/home'>⬅︎ Back to home</a>
      <div className='flex flex-row gap-3 ml-16'>
        <div className='flex flex-col'>
          <img  alt='profile pic' className='w-40 h-40 rounded-full'/>
          <div>
            {
            post[0] &&
            <>
              <h1 className='text-2xl'>{post[0].user.name}</h1>
              <p>@{post[0].user.username}</p>
            </>
            }
          </div>
        </div>
        
      </div>
    <div className='flex flex-col'>
          <div className='mx-auto w-1/2 flex flex-col gap-3'>
            <h1 className='text-2xl'>Posts</h1>
            {
              post && post.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt)).map((p)=>(
                <Post key={p._id} p={p}/>
              ))
            }
            {
              post?.length === 0 && <h1>No posts</h1>
            }

          </div>
        </div>
    </div>
  )
}

export default Profile