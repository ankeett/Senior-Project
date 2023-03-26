import React, {useState} from 'react';
import {Container, Paper, TextField, Button ,Grid, Typography} from '@mui/material'
import PinIcon from '@mui/icons-material/Pin';
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  forgotPassword } from '../../actions/userAction';

const ForgotPw = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, success, isLoading, isActivated, user} = useSelector(state=>state.user);

    const forgotHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
        navigate('/checkforgot');
    }

  return (
    <>
        <Container component='main' maxWidth='xs'>
            <Paper elevation={3} className="flex-col align-middle p-10">
                <div className='p-[20px] mb-[20px] text-center'>
                    <PinIcon/>
                    <Typography>Forgot Password</Typography>
                </div>
                <form action="" onSubmit={forgotHandler}>

                    <Grid container spacing={2} className='gap-[30px]'>
                        <TextField label="Email" name='email' required fullWidth autoFocus onChange={(e)=>setEmail(e.target.value)}/>
                        <Button fullWidth onClick={forgotHandler} className="text-white bg-[#1da1f2] rounded-lg normal-case hover:scale-105">Reset Password</Button>
                    </Grid>

                </form>
            </Paper>

            
        </Container>
        </>
     
  )
}

export default ForgotPw