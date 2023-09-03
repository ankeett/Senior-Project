import React, { useState, useEffect} from 'react'
import {Container, Paper, TextField, Button ,Grid, Typography,InputAdornment, IconButton} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibility';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate , useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {resetPassword} from '../../actions/userAction';
import Error from '../error/Error';


/*
Reset()
NAME
    Reset
SYNOPSIS
    Reset();
DESCRIPTION
    This React component allows a user to reset their password using a reset token.
    It provides a form for entering the new password and confirming it.
    It dispatches the "resetPassword" action to reset the password.
RETURNS
    Returns a React component that renders a form for password reset.
*/

const Reset = () => {
    const dispatch = useDispatch();
    const {error, success, loading} = useSelector(state=>state.forgotPw);
    const navigate = useNavigate();
    const {token} = useParams();

    // State variables
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hasError, setHasError] = useState(false);
    const [open, setOpen] = useState(true);
    
    // Function to toggle password visibility
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
       
        if (newPassword == confirmPassword){
            dispatch( resetPassword(token,newPassword));
        }
        else{
            hasError("Password no match")
            setOpen(true)
        }
        
    }

    // Redirect the user to the login page if the password is successfully reset.
    useEffect(()=>{
        if (success){
            navigate("/login");
        }
    },[dispatch, error, success])

    // Set the error state if there's an error.
    useEffect(() => {
        if (error) {
            setHasError(error)
            setOpen(true)
        }
    }, [error])

    return (
        <>
           <Container component='main' maxWidth='xs'>
                <Paper elevation={3} className="flex-col align-middle p-10">
                    <div className='p-[20px] mb-[20px] text-center'>
                        <LockResetIcon/>
                        <Typography>Reset Password</Typography>
                    </div>

                    <form  encType = "multipart/form-data" onSubmit={resetPasswordSubmit} >
                    <Grid container spacing={2} className='gap-[30px]'>
                    <TextField label="New Password" name="password" id="pw" type={showPassword ?"text":"password" }value={newPassword} fullWidth autoFocus onChange = {(e)=>setNewPassword(e.target.value)} 
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    >
                                        {showPassword?<VisibilityIcon/> :<VisibilityOffIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}                  
                    />   

                    <TextField label="Confirm Password" type="password" value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)} required fullWidth/>

                    <Button fullWidth onClick={resetPasswordSubmit} className='text-white bg-blue-700 rounded-lg normal-case hover:scale-105'>Reset Password</Button>


                    </Grid>
                    </form>
                </Paper>
           </Container>

           {/* Display an error message if there's an error. */}
           {
            hasError &&
            <Error hasError={hasError} setOpen={setOpen} open={open}/>
           }
           </>

       )
}

export default Reset