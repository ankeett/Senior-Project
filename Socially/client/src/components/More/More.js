import React from 'react'
import {useSelector} from 'react-redux'
import {TextField,Button} from '@mui/material'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'

/*
More()
NAME
    More
SYNOPSIS
    More();
DESCRIPTION
    This React component represents the "More" section of your application.
    It provides various user-related options such as viewing and editing user details,
    changing the password, and logging out.
RETURNS
    Returns a React component that renders the "More" section.
*/

const More = () => {
  const {user} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Dispatch the "logout" action to log the user out.
  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h4>More</h4>
    <div className='flex flex-col w-1/2 gap-5'>
      {
        user ?  
        <div className='flex flex-col gap-5'>
          <TextField label='Name' value={user?.name} disabled/>
          <TextField label='Username' value={user?.username} disabled/>
          <TextField label='Email' value={user?.email} disabled/>

          <div className='flex flex-row gap-5'>
            <Button className='text-white bg-[#1da1f2] normal-case h-12 rounded-full text-base'  onClick={()=>{navigate('/forgotpassword')}} fullWidth>
              Forget Password
            </Button>
            <Button className='text-white bg-[#1da1f2] normal-case h-12 rounded-full text-base' onClick={()=>{navigate('/changePassword')}} fullWidth>
              Change Password
            </Button>
          </div>
          <Button className='text-white bg-[#1da1f2] normal-case h-12 rounded-full text-base' onClick={handleClick}>Logout</Button>
        </div>
      :''
      }
      
    </div>
    </div>

  )
}

export default More