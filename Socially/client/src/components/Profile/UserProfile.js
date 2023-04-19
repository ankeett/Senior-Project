import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getUserPosts } from '../../actions/postAction'
import Post from '../Post/Post'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { followUser,unfollowUser } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  //load user details
  //load user posts
  //load user followers
  //load user following
  const id = useParams().id;
  const {post} = useSelector(state => state.posts)
  const {user} = useSelector(state => state.user)

  console.log(post)

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
          {
            post[0]?.user.avatar ? (
              <img  src={post[0].user.avatar.url} alt='profile pic' className='w-40 h-40 rounded-full'/>
            )
            :
            (
              <img  alt='profile pic' className='w-40 h-40 rounded-full'/>
            )

          }
          <div>
            {
            post[0] &&
            <>
            {/* what if there are no posts available */}
              <h1 className='text-2xl'>{post[0].user.name}</h1>
              <p>@{post[0].user.username}</p>
              { user && user._id !== post[0].user._id && 
              (
                user.following.includes(post[0].user._id) ? 
                <Button className='text-[#1da1f2] normal-case bg-gray-100 h-12 rounded-full text-base w-3/4 border-[#1da1f2]' onClick={()=>{
                dispatch(unfollowUser(post[0].user._id))
                }}><RemoveIcon/>Unfollow</Button> : <Button className='text-white bg-[#1da1f2] normal-case h-12 rounded-full text-base w-3/4' onClick={()=>{
                dispatch(followUser(post[0].user._id))
                }}><AddIcon/>Follow</Button>
              )
              }
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
                p._id &&
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