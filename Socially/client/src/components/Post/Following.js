import React,{useEffect} from 'react'
import Post from './Post'
import {getAllPosts, getFollowingsPosts, userDetails} from '../../actions/postAction'
import {useDispatch,useSelector} from 'react-redux'

const Following = () => {
    const dispatch = useDispatch()
    const {post} = useSelector(state=>state.posts)

    useEffect(()=>{
        dispatch(getFollowingsPosts())
    },[dispatch])

    console.log(post)
  return (
    <div className='mt-3 flex flex-col gap-3'>
        {
            post && post.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt)).map((p)=>(
                <Post key={p._id} p={p}/>
            ))
        }
    </div>
  )
}

export default Following