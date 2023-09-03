import React, { useState, useEffect} from 'react'
import {Container, Paper, TextField, Button ,Grid, Typography,InputAdornment, IconButton} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibility';
import ManageHistoryRoundedIcon from '@mui/icons-material/ManageHistoryRounded';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword,clearErrors} from '../../actions/userAction';
import Error from '../error/Error';


/*
ChangePassword()
NAME
    ChangePassword
SYNOPSIS
    ChangePassword();
DESCRIPTION
    This React component allows a user to change their password.
    It provides a form for entering the old password, new password, and confirming the new password.
    It also handles error messages and redirects upon successful password change.
RETURNS
    Returns a React component that renders a password change form.
*/

const ChangePassword = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.user);
    const {error, isUpdated, loading,success} = useSelector(state=>state.forgotPw);
    const navigate = useNavigate();

    // State variables
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [prevPassword, setPrevPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hasError, setHasError] = useState(false);
    const [open, setOpen] = useState(true);
    
    // Function to toggle password visibility
    const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

    // Function to handle form submission
    const changePasswordSubmit = (e) => {   
        e.preventDefault();
       
        // Check if the new password and confirm password match.
        if (newPassword == confirmPassword){
            // Dispatch the changePassword action.
            dispatch(changePassword(prevPassword, newPassword));
            navigate("/home")
        }
        else{
            setHasError("Password no match")
            setOpen(true)
        }
        
    }

    // Redirect the user to the home page if the password is successfully changed.
    useEffect(()=>{ 
        if (success){
            navigate("/signin"); 
        }
    },[dispatch, isUpdated])

    // Set the error state if there's an error.
    useEffect(() => {
        if (error) {
            setHasError(error)
            setOpen(true)
            dispatch(clearErrors())
        }
    }, [error,dispatch])

    return (
        <>
           <Container component='main' maxWidth='xs'>
                <Paper elevation={3} className="flex-col align-middle p-10">
                    <div className='p-[20px] mb-[20px] text-center'>
                        <ManageHistoryRoundedIcon/>
                        <Typography>Change Password</Typography>
                    </div>
                    
                    {/* Form for changing the password. */}
                    <form   onSubmit={changePasswordSubmit} >
                        <Grid container spacing={2} className='gap-[30px]'>

                            <TextField autoFocus label="Old Password" name="prevPassword" id="ppw" type={showOldPassword ?"text":"password" }value={prevPassword} fullWidth onChange = {(e)=>setPrevPassword(e.target.value)} 
                                InputProps={{
                                    endAdornment:(
                                        <InputAdornment position="end">
                                    <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowOldPassword}
                                    >
                                        {showOldPassword?<VisibilityIcon/> :<VisibilityOffIcon/>}
                                    </IconButton>
                                </InputAdornment>
                                    )
                                }}                  
                            />   

                            <TextField label="New Password" name="password" id="pw" type={showNewPassword ?"text":"password" }value={newPassword} fullWidth onChange = {(e)=>setNewPassword(e.target.value)} 
                                InputProps={{
                                    endAdornment:(
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowNewPassword}
                                            >
                                                {showNewPassword?<VisibilityIcon/> :<VisibilityOffIcon/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}                  
                            />   

                            <TextField label="Confirm Password" type="password" value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)} required fullWidth/>
                            <Button onClick={changePasswordSubmit} fullWidth className='text-white bg-[#1da1f2] rounded-lg normal-case hover:scale-105'>Reset Password</Button>
                        </Grid>
                    </form>
                </Paper>
           </Container>
            {/* Display error component if there's an error */}
           {
                hasError && 
                <Error hasError={hasError} setOpen={setOpen} open={open}/>
           }
           </>
       )
}

export default ChangePassword