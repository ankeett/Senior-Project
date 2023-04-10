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
    <div>post
        {
            post &&
                <Post p={post}/>
        }
      



        {/* {   post.comments && post.comments.map((c)=>(
                <div key={c._id}>
                    <p>{c.text}</p>
                </div>
        ))
        }  */}

    </div>
  )
}

export default PostPage