import React from 'react'
import { Paper,Divider, TextField, Button, Grid } from '@mui/material'



const Auth = () => {
  return (
    <div>
        <Grid container>

        <Grid item xs={6} className="flex flex-row justify-center items-center">
        <div className="m-[50px] p-[50px] rounded-[15px] object-center">
          <nav className='text-center'>
            <strong>Sign In</strong>
            <Divider className='m-5'/>
          </nav>
          <div className='flex flex-col gap-7'>
          <TextField label="Email" fullWidth/>
          <TextField label="Password" type="password" fullWidth/>
          </div>
          <Button>Sign In</Button>
          </div>
          </Grid>

          <Grid item xs={6} className="flex flex-row justify-center items-center" >
            <img src={require('../../images/signin.png')} className="w-[400px] h-[360px] object-center"/>
          </Grid>
          </Grid>
        </div>
  )
}

export default Auth