import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getAPost } from '../../actions/postAction';
import Post from './Post';



const PostPage = () => {
    const id = useParams().id;
    const {post} = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        //load user post
        //get post by id
        dispatch(getAPost(id))
    },[dispatch])

    console.log(post)

  return (
    <div>
        {
            post && post._id && 
            (

                <Post p={post}/>

                
            )
        }
        <h3>Comments</h3>
        {
            post && post._id && post.comments && post.comments.length > 0 && post.comments.map(c=>(
                <div key={c._id}>
                    <h3>{c.text}</h3>
                </div>
            ))

        }

    </div>
  )
}

export default PostPage