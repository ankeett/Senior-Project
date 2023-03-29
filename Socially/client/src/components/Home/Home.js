import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import {Button,TextField,InputAdornment,IconButton,Paper} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Feed from '../Post/Feed';



const Home = () => {
    const [open,setOpen] = useState(0);

    const [news,setNews] = useState(0);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const newsType = {0: "business", 1:"sports"}

    const API_KEY = 'e703e663951343288f7fc08a70614625';
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${newsType[news]}&apiKey=${API_KEY}&pageSize=5`;


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
    



  return (
    <div className='grid grid-flow-col-dense grid-cols-3 grid-rows-3'>
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            className ='col-span-2'
        >
            <div className='mb-4'>

        <strong className='font-semibold'>Home</strong>
            </div>
            <div className='flex flex-row normal-case h-14 ' fullWidth>
                <Button className={`text-gray-800  font-bold normal-case ${open === 0 ? "underline underline-offset-[16px] decoration-4 text-[#1da1f2]" : ""}`} fullWidth onClick={()=>{setOpen(0)}}>
                    For You
                </Button>
                <Button className={`text-gray-800 font-bold normal-case ${open === 1 ? "underline underline-offset-[16px] decoration-4 text-[#1da1f2]" : ""}`} fullWidth onClick={()=>{setOpen(1)}}>
                    Following
                </Button>

            </div>
                <Feed/>
        </Box>

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
        <TextField size='small' className='w-3/4 ml-4 mt-10' label="Search"
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton
                        
                        >
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                )
            }} 
        />
        <Paper elevation={3} className="flex-col align-middle mt-16 mr-5 ml-5 p-10 rounded-lg">
            <div>
                <h4>Latest News</h4>

                <div className='flex flex-row normal-case'>
                    <Button className={`text-gray-800  font-bold normal-case ${news === 0 ? "underline underline-offset-[16px] decoration-4 text-[#1da1f2]" : ""}`} fullWidth onClick={()=>{setNews(0)}}>
                        Business
                    </Button>
                    <Button className={`text-gray-800  font-bold normal-case ${news === 1 ? "underline underline-offset-[16px] decoration-4 text-[#1da1f2]" : ""}`} fullWidth onClick={()=>{setNews(1)}}>
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
            </div>
  )
}

export default Home