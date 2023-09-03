import React,{useState} from 'react'
import {Box,Avatar,Typography,Divider,Button, Paper,Chip,Link,Menu, MenuItem, Popper, Grow, MenuList} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import {likePost,deletePost} from '../../actions/postAction'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import VerifiedIcon from '@mui/icons-material/Verified';

/*
Post(p)
NAME
    Post
SYNOPSIS
    Post(p);
    - p: An object representing a post.
DESCRIPTION
    This React component displays a single post.
    It shows the user's profile picture, username, post content, images, tags, likes, and comments.
    Users can like the post, view comments, and perform additional actions (e.g., save, edit, delete).
PARAMETERS
    - p: An object representing a post, including user, content, images, tags, likes, and comments.
RETURNS
    Returns a React component that renders a single post.
*/
const Post = ({p}) => {
    const dispatch = useDispatch()
    const {user:currentUser} = useSelector(state=>state.user)
    const navigate = useNavigate()
    const [open,setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    // Function to handle liking a post
    const handleLike = ()=>{
        if(!currentUser){
            return
        }

        dispatch(likePost(p._id))
    }
    
    // Function to handle viewing comments
    const handleComment = ()=>{
      navigate(`/post/${p._id}`)
    }

    // Function to handle additional actions (e.g., save, edit, delete)
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    }
    // Function to handle additional actions (e.g., save, edit, delete)
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };


    const prevOpen = React.useRef(open);

    // Function to handle additional actions (e.g., save, edit, delete)
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);

    const handleSave = ()=>{

      setOpen(false)
    }

    const handleDelete = ()=>{
      dispatch(deletePost(p._id))

      setOpen(false)
    }

    const handleEdit = ()=>{
      navigate(`/update/${p._id}`)

      setOpen(false)
    }

    const [copied, setCopied] = useState(false);

    // Function to handle copying a post link
    const handleCopyLink = (id) => (event) => {
      navigator.clipboard.writeText(`http://localhost:3000/post/${id}`)

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);
      
    }

  return (
    <div>
      { p &&
        <Paper elevation={2} >
            <Box className='flex flex-row p-4'>
                <Avatar className='flex-none'>
                  {
                    p.user && p.user.avatar && p.visibility === 'public' ?
                    <img src={p.user.avatar.url} alt='profile pic' className='w-full h-full rounded-full'/>
                    :
                    <LockIcon/>
                  }
                  
                </Avatar>
              
              
                <Box className='grow flex flex-col ml-4'>
                    {
                      p.visibility === 'public' ?
                      <>
                        <div className='flex flex-row gap-1'>
                          <Link variant='h6' href= {`/profile/user/${p.user._id}`} >{p.user.name}</Link>
                          <VerifiedIcon className='mt-1 text-blue-500' fontSize='small'/>
                        </div>
                        <Typography variant='subtitle2'>@{p.user.username}</Typography>
                      </>
                      :
                      <Typography variant='h6'>Anonymous</Typography>
                        
                    }
                </Box>
                <div>
                  <Button onClick={handleToggle} ref={anchorRef}>
                    <MoreVertIcon className='text-black'/>
                  </Button>
                  <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open}>
                              {
                                p.user._id !== currentUser._id &&

                                <MenuItem onClick={handleSave}>Save &nbsp; &nbsp;
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                  </svg>

                                </MenuItem>
                              }
                              {
                                p.user._id === currentUser._id &&
                                <>
                                  <MenuItem onClick={handleEdit}>Edit &nbsp; &nbsp;
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                  </svg>

                                  </MenuItem>
                                  <MenuItem onClick={handleDelete}>Delete &nbsp; 
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>

                                  </MenuItem>
                                </>
                              }
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
        </Popper>
                </div>
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
                    <Button className='text-2xl text-black' onClick={handleLike}><FavoriteIcon/></Button>
                    :
                    <Button className='text-2xl text-black'onClick={handleLike}><FavoriteBorderIcon/></Button>
                }
                <p>{p.likes.length}</p>
                </div>
                
                <div className='flex flex-row'>
                <Button className='text-2xl' onClick={handleComment}>
                  {/*path for svg icon*/}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black ">
                  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                </svg>
                </Button>
                <p>{p.comments.length}</p>
                </div>
                <Button className='text-2xl text-black' onClick = { handleCopyLink(p._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                  <div className='text-sm'>
                    {copied ? 'Link Copied!' : ''}
                  </div>
                </Button>
 
            </div>
            
        </Paper>
    }
    </div>
  )
}
export default Post