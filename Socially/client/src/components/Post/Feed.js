import React,{useEffect} from 'react'
import Post from './Post'
import {getAllPosts, userDetails} from '../../actions/postAction'
import {useDispatch,useSelector} from 'react-redux'

const Feed = () => {
    const dispatch = useDispatch()
    const {post} = useSelector(state=>state.posts)

    useEffect(()=>{
        dispatch(getAllPosts())
    },[dispatch])
    console.log(post)


   

  return (
    <div className='mt-3 flex flex-col gap-3'>
        {
            post?.map((p)=>(
                <Post key={p._id} p={p}/>
            ))
        }
    </div>
  )
}

export default Feed