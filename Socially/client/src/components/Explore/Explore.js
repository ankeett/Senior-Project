import React, { useEffect } from 'react'
import { Drawer, useMediaQuery,Divider,TextField,InputAdornment,IconButton, Paper,Link,Card,Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch,useSelector } from 'react-redux'
import { popularTags } from '../../actions/postAction'
import { useNavigate } from 'react-router-dom';

/*
Explore()
NAME
    Explore
SYNOPSIS
    Explore();
DESCRIPTION
    This React component represents the Explore page of your application.
    It displays popular tags and provides search functionality and a list of people to follow.
    The component adjusts its layout based on the screen size.
RETURNS
    Returns a React component that renders the Explore page.
*/

const Explore = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const {tags} = useSelector(state=>state.tags)
  const {post} = useSelector(state=>state.posts)

  useEffect(()=>{
    // Dispatch the "popularTags" action to get popular tags
    dispatch(popularTags())
  },[dispatch])



  return (
    <div>
      <strong className='font-semibold'>Explore</strong>
        <div className='flex flex-col'>
          <strong className='font-semibold mt-4 mb-4'>Popular Tags</strong>
          <div className='flex flex-col gap-3 w-3/4'>
            {/* Render popular tags */}
            {tags && tags.sort((a, b) => b.count - a.count).map((t)=>{
              return(
                <Card className='p-8 cursor-pointer hover:mb-1 hover:font-semibold' onClick={()=> {
                  navigate(`/postsByTag/${t.tag}`)
                }}>
                  {t.tag}
                  {
                    t.count > 0 && (
                      <span className='text-gray-500 ml-2'>({t.count})</span>
                    )
                  }
                  </Card>
              )
            })}
          </div>
        </div>
       
        {/* Drawer for large screens */}
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
                        <h4>People to Follow</h4>
                    </div>
            </Paper>

        </Drawer>
      )}

    </div>

  )
}

export default Explore