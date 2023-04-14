import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { loadUser } from '../../actions/userAction'
import { getAllPosts } from '../../actions/postAction'

const LoadDetails = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)
    const {post} = useSelector(state=>state.posts)

    useEffect(()=>{
        dispatch(loadUser())
      },[dispatch])

    console.log(post)

  return (
    <div>
        
    </div>
  )
}

export default LoadDetails