import React, { useEffect } from 'react'
import {Box,Avatar,Typography,Divider,Button, Paper,Chip,Link} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import {userDetails,likePost} from '../../actions/postAction'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';


const Post = ({p}) => {
    const dispatch = useDispatch()
    const {user:currentUser} = useSelector(state=>state.user)
    const navigate = useNavigate()

    
    const handleLike = ()=>{
        console.log('handleLike')
        if(!currentUser){
            return
        }

        dispatch(likePost(p._id))
    }
    
    const handleComment = ()=>{
      console.log('handleComment')
      navigate(`/post/${p._id}`)
    }
    
  return (
    <div>
      { p &&
        <Paper elevation={2} >
            <Box className='flex flex-row p-4'>
                <Avatar>
                  <img src={p.user.avatar.url} alt='profile pic' className='w-full h-full rounded-full'/>
                </Avatar>
                <Box className='flex flex-col ml-4'>
                    <Link variant='h6' href= {`/profile/user/${p.user._id}`} >{p.user.name}</Link>
                    <Typography variant='subtitle2'>@{p.user.username}</Typography>
                </Box>
                <Divider/>
            </Box>
            <div className='flex flex-col m-3'>
                <p>{p.content}</p>
                {
                    p.image && (p.image.length > 0 &&
                    <div className='flex flex-row gap-2'>
                        {p.image.map((img,index)=>{

                            return(
                                <img key={index} src={img.url} alt='postImage' className={`mx-auto object-cover ${p.image.length > 1 ? "w-40 h-40": "w-full h-full"}`}/>
                            )
                        }
                        )}
                    </div>
                    )

                }
            </div>
            
            <Divider className='w-3/4 ml-16'/>
            <div className='flex flex-row gap-2 ml-3'>
                {p.tags.map((tag,index)=>{
                  return(
                    <Chip
                      key={index}
                      style={{margin:'10px 0'}}
                      value={tag}
                      label={tag}
                      varient="outlined"
                      onClick={()=>navigate(`/postsByTag/${tag}`)}
                    />
                  )
                })}
              </div>

            <div className='flex flex-row justify-between'>
                <div className='flex flex-row'>
                {currentUser && p.likes.includes(currentUser._id) ?
                    <Button className='text-2xl' onClick={handleLike}><FavoriteIcon/></Button>
                    :
                    <Button className='text-2xl'onClick={handleLike}><FavoriteBorderIcon/></Button>
                }
                <p>{p.likes.length}</p>
                </div>
                
                <Button className='text-2xl' onClick={handleComment}>💬</Button>
                <Button className='text-2xl'>🔁</Button>
            </div>
            
        </Paper>
    }
    </div>
  )
}

export default Post