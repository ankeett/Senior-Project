import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { createComment, getAPost } from '../../actions/postAction';
import Post from './Post';
import { TextField,IconButton,InputAdornment,Card,CardHeader,Avatar, CardContent} from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

import moment from 'moment'

/*
PostPage
NAME
    PostPage
SYNOPSIS
    PostPage();
DESCRIPTION
    This React component displays a single post page, including the post itself and its comments.
    Users can view the post, add comments, and navigate back to the home page.
PARAMETERS
    None.
RETURNS
    Returns a React component that renders a single post page.
*/

const PostPage = () => {
    // Get the post ID from the URL
    const id = useParams().id;

    // Get the post from the Redux store
    const {post} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const [comment,setComment] = useState('')

    useEffect(() => {
        //load user post
        //get post by id
        dispatch(getAPost(id))
    },[dispatch])

  return (
    <div>
        <a href='/home'>⬅︎ Back to home</a>
        <div className='w-3/5 mx-auto mt-10'>
        {
            post && post._id && 
            (
                <Post p={post}/>
            )
        }

        <div  className='flex flex-col gap-5'>
        <div>

        
        <h3>Comments</h3>
            <TextField name='comment' autoFocus placeholder='Enter a comment...' size='small' 
            variant='outlined' fullWidth value = {comment} onChange={(e)=>{

                setComment(e.target.value);
                }}
            onKeyPress={(e)=>{
                if(e.key === 'Enter'){
                    dispatch(createComment(id,comment))
                }
            }
        }
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton>
                            <ArrowBackIosOutlinedIcon className='text-blue-500 rotate-90' 
                              onClick={()=>{dispatch(createComment(id,comment))}}
                              onMouseEnter={()=>{dispatch(createComment(id,comment))}}
                              />
                        </IconButton>
                    </InputAdornment>
                )
            }} 
            />
        </div>

        {/*Render comments */}
        {
            post && post._id && post.comments && post.comments.length > 0 && post.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(c=>(
                <div key={c._id} >
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar>
                                    <img src={c.user?.avatar.url} alt='avatar' className='w-10 h-10 rounded-full'/>
                                </Avatar>
                            }
                            title={c.user.name}
                            subheader={moment(c.createdAt).format('MMMM D, YYYY, h:mm a')}
                        />

                    <CardContent>{c.comment}</CardContent>
                    </Card>
                </div>
            ))

        }
        </div>
        </div>

    </div>
  )
}

export default PostPage