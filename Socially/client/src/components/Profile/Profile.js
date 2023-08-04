import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getUserPosts } from '../../actions/postAction'
import Post from '../Post/Post'
import { useNavigate } from 'react-router-dom'
import { loadUser } from '../../actions/userAction'
import VerifiedIcon from '@mui/icons-material/Verified';


const Profile = () => {

  //load user details
  //load user posts
  //load user followers
  //load user following
  const {post} = useSelector(state => state.posts)
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserPosts(user._id))
  }, [dispatch])


  return (
    <div>
      <a href='/home'>⬅︎ Back to home</a>
      <div className='flex flex-row gap-3'>
        <div className='flex flex-col'>
          {
            user?.avatar ? (
              <img src={user.avatar.url}  alt='profile pic' className='w-40 h-40 rounded-full'/>
            )
            :
            (
              <img  alt='profile pic' className='w-40 h-40 rounded-full'/>
            )
          }
          <div>
            <div className='flex flex-row'>

            <h1 className='text-2xl'>{user.name}</h1>
            <VerifiedIcon className='mt-4 text-blue-500'/>
            </div>
            <p>@{user.username}</p>
          </div>
        </div>
        
    </div>
    <div className='flex flex-col'>
          <h1 className='text-2xl'>Posts</h1>
          <div className='w-3/5 mt-3 flex flex-col gap-3'>
            {
              post?.map((p)=>(
                p._id &&
                <Post key={p._id} p={p}/>
              ))
            }

            {
              post?.length === 1 && !post[0]._id && (
                <div className='flex flex-col items-center'>
                  <h1 className='text-2xl'>No posts yet</h1>
                </div>
              )
            }
          </div>
        </div>
    </div>
  )
}

export default Profile