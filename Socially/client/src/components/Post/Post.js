import React, { useEffect } from 'react'
import {Box,Avatar,Typography,Divider,Button, Paper,Chip} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import {userDetails} from '../../actions/postAction'

const Post = ({p,user}) => {
    const dispatch = useDispatch()
        
  return (
    <div>
        <Paper elevation={2} >
            <Box className='flex flex-row p-4'>
                <Avatar/>
                <Box className='flex flex-col ml-4'>
                    <Typography variant='h6'>{p.user.name}</Typography>
                    <Typography variant='subtitle2'>@{p.user.username}</Typography>
                </Box>
                <Divider/>
            </Box>
            <div className='flex flex-col m-3'>
                <p>{p.content}</p>
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
                    />
                  )
                })}
              </div>

            <div className='flex flex-row justify-between'>
                <Button className='text-2xl'>🤍</Button>
                <Button className='text-2xl'>💬</Button>
                <Button className='text-2xl'>🔁</Button>
            </div>
            
        </Paper>
    </div>
  )
}

export default Post