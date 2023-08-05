import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import {Button,TextField,InputAdornment,IconButton,Paper, useMediaQuery} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Feed from '../Post/Feed';
import Following from '../Post/Following';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../actions/userAction';
const {useNavigate} = require('react-router-dom');



const Home = () => {
    const isLargeScreen = useMediaQuery('(min-width:1200px)');
    const [open,setOpen] = useState(0);

    const [news,setNews] = useState(0);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const newsType = {0: "business", 1:"sports"}
    const navigate = useNavigate();

    const API_KEY = 'e703e663951343288f7fc08a70614625';
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${newsType[news]}&apiKey=${API_KEY}&pageSize=5`;

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
          setLoading(true);
          const response = await fetch(`${API_URL}&page=${page}`);
          const data = await response.json();
          setArticles(data.articles);
          setLoading(false);
        }
        fetchData();
      }, [page,news]);
    

    const users = useSelector(state => state.users);

    const [searchTerm, setSearchTerm] = useState("");

    const dispatchSearch = (keyword) => {
        navigate(`/search/${keyword}`);
        
        // dispatch(searchUser(keyword));
        // setSearchTerm("");
    };

    useEffect(() => {
        console.log(users); // This will log the updated value after the state has been updated.
    }, [users]);
  return (

    <div className='grid grid-flow-col-dense grid-cols-3 grid-rows-3'>
        <Box
            component="main"
            className ="col-span-2"
        >
            <div className='mb-4'>
                <strong className='font-semibold'>Home</strong>
            </div>
            <div className='flex flex-row normal-case h-14 ' fullWidth>
                <Button className={`font-bold normal-case ${open === 0 ? "underline underline-offset-[16px] decoration-4 text-[#1da1f2]" : "text-gray-700 "}`} fullWidth onClick={()=>{setOpen(0)}}>
                    For You
                </Button>
                <Button className={`font-bold normal-case ${open === 1 ? "underline underline-offset-[16px] decoration-4 text-[#1da1f2]" : "text-gray-700"}`} fullWidth onClick={()=>{setOpen(1)}}>
                    Following
                </Button>

            </div>
                {
                    open === 0 ? <Feed/> : <Following/>

                }
        </Box>
        {isLargeScreen && (
            <Drawer
                sx={{
                width: 1/4,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 1/4,
                    boxSizing: 'border-box',
                },
                }}
                variant="permanent"
                anchor="right"
            >
                {/* <Toolbar /> */}
                <Divider />
                <TextField size='small' className='w-3/4 ml-4 mt-10' label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e)=>{
                    if(e.key === 'Enter'){
                        dispatch(dispatchSearch(searchTerm))
                    }
                }}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position="end">
                                <IconButton
                                
                                >
                                    <SearchIcon onClick={()=>{
                                        //call function that dispatches search
                                        dispatchSearch(searchTerm)
                                    }

                                        }/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }} 
                />
                <Paper elevation={3} className="flex-col align-middle mt-16 mr-5 ml-5 p-10 rounded-lg">
                    <div>
                        <h4>Latest News</h4>

                        <div className='flex flex-row normal-case'>
                            <Button className={`font-bold normal-case ${news === 0 ? "underline underline-offset-[16px] decoration-4 text-[#1da1f2]" : "text-gray-800  "}`} fullWidth onClick={()=>{setNews(0)}}>
                                Business
                            </Button>
                            <Button className={` font-bold normal-case ${news === 1 ? "underline underline-offset-[16px] decoration-4 text-[#1da1f2]" : "text-gray-800 "}`} fullWidth onClick={()=>{setNews(1)}}>
                                Sports
                            </Button>
                        </div>
                        {articles.map(article => (
                            <div key={article.title} >
                            <a href={article.url} target="_blank" className=' text-black'><p>{article.title}</p></a>
                            </div>
                        ))}
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <Button className='text-white bg-[#1da1f2] normal-case' onClick={() => setPage(page + 1)}>Load More</Button>
                        )}
                        </div>
                            </Paper>
                        </Drawer>
                )}
            </div>
  )
}

export default Home