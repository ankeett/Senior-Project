import React, { useState, useEffect} from 'react'
import {Container, Paper, TextField, Button ,Grid, Typography,InputAdornment, IconButton} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibility';
import ManageHistoryRoundedIcon from '@mui/icons-material/ManageHistoryRounded';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword} from '../../actions/userAction';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.user);
    console.log(user)
    const {error, isUpdated, loading,success} = useSelector(state=>state.forgotPw);
    const navigate = useNavigate();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

    const [prevPassword, setPrevPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changePasswordSubmit = (e) => {   
        e.preventDefault();
       
        if (newPassword == confirmPassword){
            dispatch(changePassword(prevPassword, newPassword));
        }
        else{
            alert("Password no match")
        }
        
    }

    useEffect(()=>{ 
        if (success){
            navigate("/signin"); 
        }
    },[dispatch, error, isUpdated])
    return (
        <>
           <Container component='main' maxWidth='xs'>
                <Paper elevation={3} className="flex-col align-middle p-10">
                    <div className='p-[20px] mb-[20px] text-center'>
                        <ManageHistoryRoundedIcon/>
                        <Typography>Change Password</Typography>
                    </div>

                    <form   onSubmit={changePasswordSubmit} >
                        <Grid container spacing={2} className='gap-[30px]'>

                            <TextField label="Old Password" name="prevPassword" id="ppw" type={showOldPassword ?"text":"password" }value={prevPassword} fullWidth autoFocus onChange = {(e)=>setPrevPassword(e.target.value)} 
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

                            <TextField label="New Password" name="password" id="pw" type={showNewPassword ?"text":"password" }value={newPassword} fullWidth autoFocus onChange = {(e)=>setNewPassword(e.target.value)} 
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
                            <Button onClick={changePasswordSubmit} fullWidth className='text-white bg-blue-700 rounded-lg normal-case hover:scale-105'>Reset Password</Button>
                        </Grid>
                    </form>
                </Paper>
           </Container>
           </>
       )
}

export default ChangePassword