import React from 'react'
import {Box,Avatar,Typography,Divider,Button, Paper} from '@mui/material'
import {useSelector} from 'react-redux'

const Post = () => {
    const {user} = useSelector(state=>state.user)
  return (
    <div>
        <Paper elevation={2} >
            <Box className='flex flex-row p-4'>
                <Avatar/>
                <Box className='flex flex-col ml-4'>
                    <Typography variant='h6'>{user?.name}</Typography>
                    <Typography variant='subtitle2'>@{user?.username}</Typography>
                </Box>
                <Divider/>

                

            </Box>
            <div className='flex flex-col m-3'>
                <h4>This is a title</h4>
                <p>This is a description</p>
            </div>
            <div className='flex flex-row justify-between'>
                <Button>🤍</Button>
                <Button>💬</Button>
                <Button>🔁</Button>
            </div>
            
        </Paper>
    </div>
  )
}

export default Post