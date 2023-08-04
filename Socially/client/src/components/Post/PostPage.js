import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { createComment, getAPost } from '../../actions/postAction';
import Post from './Post';
import { TextField,IconButton,InputAdornment,Card,CardHeader,Avatar, CardContent} from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';



const PostPage = () => {
    const id = useParams().id;
    const {post} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const [comment,setComment] = useState('')

    useEffect(() => {
        //load user post
        //get post by id
        dispatch(getAPost(id))
    },[dispatch])

    console.log(post)

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
                console.log(comment)
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

        
        {
            post && post._id && post.comments && post.comments.length > 0 && post.comments.map(c=>(
                <div key={c._id} >
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar>
                                    <img src={c.user?.avatar.url} alt='avatar' className='w-10 h-10 rounded-full'/>
                                </Avatar>
                            }
                            title={c.user.name}
                            subheader={c.createdAt}
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