import React,{useState,useEffect} from 'react';
import {Box,Drawer,CssBaseline,AppBar,Toolbar,List,Divider, Avatar, MenuItem, Input,Select} from '@mui/material'


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
import { Button, TextField,Paper } from '@mui/material';
import { Link, useNavigate,useLocation,Outlet } from "react-router-dom";

import PublicIcon from '@mui/icons-material/Public';
import HttpsIcon from '@mui/icons-material/Https';

const Menus = [
    {title: "Home", src: <HomeOutlinedIcon/>,clicked:<HomeIcon/>, link: '/home' },
    {title: "Explore",src: <ExploreOutlinedIcon/>,clicked:<ExploreIcon/>,link: '/explore'},
    { title: "Notifications", src: <NotificationsNoneOutlinedIcon/>,clicked:<NotificationsIcon/> ,link: '/notifications'},
    { title: "Messages", src: <MessageOutlinedIcon/>,clicked:<MessageIcon/> ,link: '/messages'},
    { title: "Profile", src: <PersonOutlineOutlinedIcon/>,clicked:<PersonIcon/> ,link: '/profile'},
    { title: "More", src: <ExpandCircleDownOutlinedIcon/>,clicked:<ExpandCircleDownIcon/> ,link: '/more'},
  ]; 

const drawerWidth = 360;

const Nav =()=> {
    const navigate = useNavigate();
    const pathname = useLocation().pathname
    const [status,setStatus] = useState('Everyone');

    const [open,setOpen] = useState(0);
    console.log(open)

    useEffect(() => {
      navigate('/home');
    }, []);

    const [advanced, setAdvanced] = useState(false);
    const handlePost = (e) =>{
      e.preventDefault();
      setAdvanced((prevAdvanced)=>!prevAdvanced);
    }
    
  return (
    <div className='flex'>

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
      </AppBar>
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
            <img  src={require("../../images/message.png")} className=" w-10 h-10 object-center"/>
            <p>Socially</p>
        </Toolbar>
        {/* <Divider /> */}
        <List className='m-5 p-8'>
          {Menus.map((m,index) => (
            <li key={index}>
                <Link to={m.link} className="flex flex-row gap-5 m-7 no-underline text-black">
                    <div>
                        {m.link === pathname ? m.clicked :m.src} 
                    </div>
                    <span className={m.link === pathname ? `font-bold`:''}>
                        {m.title}
                    </span>
                </Link>
            </li>
          ))}

          <Button className='text-white bg-[#1da1f2] normal-case h-12 rounded-full text-base' fullWidth onClick={handlePost}>Post</Button>
        </List>        
      </Drawer>
      
    </Box>

    {advanced ? 
        <div className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-[99] w-full h-full'>
          <Paper className=" p-[30px] rounded-[15px] w-2/5 " elevation={6}>
            <div className='text-end '  ><CancelIcon className='cursor-pointer' onClick={handlePost}/></div>  
            <div className='flex flex-row mb-5 gap-3' >
              <Avatar className='bg-[#1da1f2]'>
                A
              </Avatar>
              <Select disableUnderline={true} size='small' className='w-1/4 h-1/9 outline-none' variant="standard" label="Audience" defaultValue={status} onChange={(e)=>{setStatus(e.target.value)}}>
                <MenuItem value="Everyone">Everyone</MenuItem>
                <MenuItem value="Anonymous"> Anonymous</MenuItem>
              </Select>
            </div> 
            
            <div>
              <Input disableUnderline={true} multiline placeholder="What's on your mind?" variant="standard" className='border-none w-full ml-6'
              />
            </div>
            <Divider className='m-5'/>
            <Button className='text-white bg-[#1da1f2] normal-case text-base float-right'>Post</Button>
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