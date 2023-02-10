import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';


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


import { Button, TextField } from '@mui/material';
import { Link, useNavigate,useLocation,Outlet } from "react-router-dom";

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

    const [open,setOpen] = useState(0);
    console.log(open)

    useEffect(() => {
      navigate('/home');
    }, []);
    
  return (
    <div className='flex'>

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
          Permanent drawer
          </Typography>
        </Toolbar> */}
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

          <Button className='text-white bg-[#1da1f2] normal-case h-12' fullWidth>Post</Button>
        </List>        
      </Drawer>
      
    </Box>

    <div className="h-screen flex-1 p-7">
      <Outlet/>

    </div>

\    </div>
  );
}

export default Nav;