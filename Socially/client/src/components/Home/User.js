import React from 'react'
import { Paper,Link,Button } from '@mui/material';

const User = ({user}) => {

  return (
    <Paper elevation={2} className='w-3/4 h-full'>
    <Link href={`/profile/user/${user._id}`} className='decoration-none'>
        <div className='flex flex-row items-center gap-5 p-4'>
            <img src={user.avatar.url} alt="" className='w-10 h-10 rounded-full' />
            <div className='flex flex-col -space-y-1'>
                <h4 className='text-xl font-bold'>{user.username}</h4>
                <p>{user.name}</p>
            </div>
        </div>
    </Link>
    <div className='text-right'>
        <Button>Follow</Button>
    </div>
</Paper>


  )
}

export default User