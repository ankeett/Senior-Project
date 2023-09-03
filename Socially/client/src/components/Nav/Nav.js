import React,{useState,useEffect} from 'react';
import {Box,Drawer,CssBaseline,AppBar,Toolbar,List,Divider, Avatar, MenuItem, Input,Select, IconButton,Chip,useMediaQuery} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button,Paper } from '@mui/material';
import { Link, useNavigate,useLocation,Outlet } from "react-router-dom";

import PublicIcon from '@mui/icons-material/Public';
import HttpsIcon from '@mui/icons-material/Https';
import ImageIcon from '@mui/icons-material/Image';
import GifBoxIcon from '@mui/icons-material/GifBox';

import {useDispatch,useSelector} from 'react-redux'
import { loadUser } from '../../actions/userAction';
import {createPost} from '../../actions/postAction'



/*
Nav()
NAME
    Nav
SYNOPSIS
    Nav();
DESCRIPTION
    This React component represents the main navigation menu of your application.
    It includes links to various sections like Home, Explore, Notifications, Messages, Profile, and More.
    It also provides options for creating a new post with advanced settings.
    The component adjusts its layout based on the screen size, providing a responsive design.
RETURNS
    Returns a React component that renders the navigation menu and handles user interactions.
*/
const Nav =()=> {
    let drawerWidth = 360
    const isLargeScreen = useMediaQuery('(min-width:860px)');

    isLargeScreen ? drawerWidth = 300 : drawerWidth = 130

    const {user,isAuthenticated} = useSelector(state=>state.user)

    const Menus = [
      {title: "Home", src: <HomeOutlinedIcon/>,clicked:<HomeIcon/>, link: '/home',isAuth: false },
      {title: "Explore",src: <ExploreOutlinedIcon/>,clicked:<ExploreIcon/>,link: '/explore',isAuth: false},
      { title: "Notifications", src: <NotificationsNoneOutlinedIcon/>,clicked:<NotificationsIcon/> ,link: '/notifications', isAuth: false},
      { title: "Messages", src: <MessageOutlinedIcon/>,clicked:<MessageIcon/> ,link: '/messages',isAuth: !user},
      { title: "Profile", src: <PersonOutlineOutlinedIcon/>,clicked:<PersonIcon/> ,link: '/profile',isAuth: !user},
      { title: "More", src: <ExpandCircleDownOutlinedIcon/>,clicked:<ExpandCircleDownIcon/> ,link: '/more',isAuth: false},
    ]; 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathname = useLocation().pathname

    //State variables
    const [status,setStatus] = useState('Everyone');
    const [visibility,setVisibility] = useState("public");
    const [images,setImages] = useState([]);
    const [tags,setTags] = useState([]);
    const [open,setOpen] = useState(0);
    const [post,setPost] = useState("");
    const [advanced, setAdvanced] = useState(false);

    
    useEffect(() => {
      navigate('/home');
    }, []);
    
    // Function to add the tag to the list of tags
    const handleAdd = (e) =>{
      if(e.key === 'Enter' && e.target.value !== '')
      {
        setTags((prevTags)=>[...prevTags, e.target.value]);
        e.target.value = '';
      }
    }
    
    // Function to delete the tag from the list of tags
    const handleDelete = (tagToDelete)=>{
      setTags(tags.filter((tag) => tag !==tagToDelete));
    }
    
    // Function to toggle the advanced settings
    const handlePost = (e) =>{
      e.preventDefault();
      setAdvanced((prevAdvanced)=>!prevAdvanced);
    }

    // Function to handle image uploads
    const handleImages = (e)=>{
      const files = Array.from(e.target.files);
      setImages([]);
      files.forEach((file)=>{
          const reader = new FileReader();
  
          reader.onload = () => {
              if (reader.readyState=== 2){
                  setImages((old)=>[...old, reader.result]);
              }
          }
  
          reader.readAsDataURL(file);
      });
  
    }

    // Function to handle the post visibility
    useEffect(() => {
      if(status === 'Everyone'){
        setVisibility('public');
      }
      else{
        setVisibility('private');
      }
    },[status])

    // Function to create a new post
    const handleCreatePost = (e)=>{
      if(user){

        dispatch(createPost(post,tags,images,visibility));
      }
      else{
        navigate('/login');
      }

    }
    
  return (
    <div className='flex'>

    <Box sx={{ display: 'flex' }}>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        >
        <Toolbar className='flex flex-col m-2'>
            <img  src={require("../../images/lighthouse.png")} className=" w-10 h-10 object-center"/>
            <p>Beacon</p>
        </Toolbar>
        {/* <Divider /> */}
        <List className='m-5 pt-8 pl-4'>
          {Menus.map((m,index) => (
            !m.isAuth ?
            <li key={index}>
                <Link to={m.link} className="flex flex-row gap-5 m-7 no-underline text-black">
                    <div>
                        {m.link === pathname ? m.clicked :m.src} 
                    </div>
                    { isLargeScreen &&
                      <span className={m.link === pathname ? `font-bold`:''}>
                        {m.title}
                      </span>
                    }
                </Link>
            </li>
            :''
          ))}

          <Button className='text-white bg-[#1da1f2] normal-case h-12 rounded-full text-base w-3/4'  onClick={handlePost}>Post</Button>

        </List>  
        <div className=' absolute text-center inset-x-0 bottom-0'>
            <Paper elevation={0} className='m-3 p-3 '>
             { user?.name ? 
                <div className='flex flex-row justify-center items-center gap-4'>
                  <Avatar>
                    {
                      user?.avatar ?
                      <img src={user?.avatar.url} className='w-full h-full object-cover rounded-full'/>
                      :
                      <img className='w-full h-full object-cover rounded-full'/>
                    }
                  </Avatar>
                  <p className=' mr-4 text-sm'>{user?.name}</p>
                </div>
                :
                <div className='flex flex-row justify-center items-center gap-4'>
                  <Button className='text-white bg-[#1da1f2] normal-case h-12 rounded-full text-base w-3/5 mr-16'  onClick={()=>{navigate('/login')}}>Login</Button>
                </div>
            }
            </Paper>
      </div> 
            
      </Drawer>
      
    </Box>

    {advanced ? 
        <div className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-[99] w-full h-full'>
          <Paper className=" p-[30px] rounded-[15px] w-2/5 " elevation={6}>
            <div className='text-end '  ><CancelIcon className='cursor-pointer' onClick={handlePost}/></div>  
            <div className='flex flex-row mb-5 gap-3' >
              <Avatar className='bg-[#1da1f2]'>
                {status === 'Anonymous' ? <HttpsIcon/> : <PublicIcon/>}
              </Avatar>
              <Select disableUnderline={true} size='small' className='w-1/4 h-1/9 outline-none' variant="standard" label="Audience" defaultValue={status} onChange={(e)=>{setStatus(e.target.value)}}>
                <MenuItem value="Everyone">Everyone</MenuItem>
                <MenuItem value="Anonymous"> Anonymous</MenuItem>
              </Select>
            </div> 
            
            <div>
              <Input disableUnderline={true} multiline placeholder="What's on your mind?" variant="standard" onChange={(e)=>{setPost(e.target.value)}} className='border-none w-full ml-6 h-full'
              />
            </div>
            <Divider className='m-2 mt-7'/>

            <Input disableUnderline={true} placeholder="tags" variant="standard" className='border-none w-full ml-6 h-full mt-2' onKeyDown={handleAdd}
              />
            <div className='flex flex-row gap-2'>
                {tags.map((tag,index)=>{
                  return(
                    <Chip
                      key={index}
                      style={{margin:'10px 0'}}
                      value={tag}
                      onDelete={()=>{handleDelete(tag)}}
                      label={tag}
                      varient="outlined"
                    />
                  )
                })}
              </div>
                <div className='grid grid-cols-2 gap-6'>
                {images &&
                      images.map((img,index)=>{
                        return(
                          <div key={index} className="">
                              <IconButton onClick={()=>setImages(images.filter((e)=> e !== img))}><CancelIcon className='object-top'/></IconButton>
                              <img src={img} height='200' width='200'/>
                          </div>
                        )
                      })
                    }
                  
                </div>
              <div className='flex flex-row justify-between'>
                <div>
                  <label htmlFor="myInput"><ImageIcon className='cursor-pointer text-[#1da1f2] float-left mt-3' style={{ fontSize: '20px'}}/></label>
                  <input id="myInput" type="file" fullWidth name='image' multiple accept="image/png image/jpeg image/webp" className='hidden  ' onChange = {handleImages}/>
                  <label htmlFor="myGif"><GifBoxIcon className='cursor-pointer text-[#1da1f2] float-left mt-3' style={{ fontSize: '20px'}}/></label>
                  <input id="myGif" type="file" fullWidth name='image' multiple accept="image/png image/jpeg image/webp image/gif" className='hidden' onChange = {handleImages}/>
                </div>
                <Button className='text-white bg-[#1da1f2] normal-case text-base rounded-full float-right' onClick={handleCreatePost}>Post</Button>
            </div>
          </Paper>
        </div> : ''
    }
    <div className="h-screen flex-1 p-7">
      <Outlet/>

    </div>
     
    </div>
  );
}

export default Nav;