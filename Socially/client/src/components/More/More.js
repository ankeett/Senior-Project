import React from 'react'
import {useSelector} from 'react-redux'
import {TextField,Button} from '@mui/material'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/userAction'

const More = () => {
  const {user} = useSelector(state=>state.user)
  console.log(user)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h4>More</h4>
    <div className='flex flex-col w-1/4 gap-5'>
      {
        user ?  
        <div className='flex flex-col gap-5'>
          <TextField label='Name' value={user?.name} disabled/>
          <TextField label='Username' value={user?.username} disabled/>
          <TextField label='Email' value={user?.email} disabled/>

          <div className='flex flex-row gap-5'>
          <Button className='text-white bg-[#1da1f2] normal-case h-12 rounded-full text-base'>Forget Password</Button>
          <Button className='text-white bg-[#1da1f2] normal-case h-12 rounded-full text-base'>Change Password</Button>
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