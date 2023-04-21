import React, { useEffect,useRef } from 'react'
import {Box,Avatar,Typography,Divider,Button, Paper,Chip,Link,Menu, MenuItem, Popper, Grow, MenuList} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import {userDetails,likePost} from '../../actions/postAction'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Post = ({p}) => {
    const dispatch = useDispatch()
    const {user:currentUser} = useSelector(state=>state.user)
    const navigate = useNavigate()
    const [open,setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    
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

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    }
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);

    const handleSave = ()=>{
      console.log('handleSave')

      setOpen(false)
    }

    const handleDelete = ()=>{
      console.log('handleDelete')

      setOpen(false)
    }

    const handleEdit = ()=>{
      console.log('handleEdit')

      setOpen(false)
    }

  return (
    <div>
      { p &&
        <Paper elevation={2} >
            <Box className='flex flex-row p-4'>
                <Avatar className='flex-none'>
                  {
                    p.visibility === 'public' ?
                    <img src={p.user.avatar.url} alt='profile pic' className='w-full h-full rounded-full'/>
                    :
                    <LockIcon/>
                  }
                  
                </Avatar>
              
              
                <Box className='grow flex flex-col ml-4'>
                    {
                      p.visibility === 'public' ?
                      <>
                        <Link variant='h6' href= {`/profile/user/${p.user._id}`} >{p.user.name}</Link>
                        <Typography variant='subtitle2'>@{p.user.username}</Typography>
                      </>
                      :
                      <Typography variant='h6'>Anonymous</Typography>
                        
                    }
                </Box>
                <div>
                  <Button onClick={handleToggle} ref={anchorRef}>
                    <MoreVertIcon/>
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

                                <MenuItem onClick={handleSave}>Save 💾</MenuItem>
                              }
                              {
                                p.user._id === currentUser._id &&
                                <>
                                  <MenuItem onClick={handleEdit}>Edit ✍️</MenuItem>
                                  <MenuItem onClick={handleDelete}>Delete 🗑️</MenuItem>
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