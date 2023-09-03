/*
Auth()
NAME
    Auth
SYNOPSIS
    Auth();
DESCRIPTION
    This React component handles user authentication. It allows users to sign in with their email and password,
    shows/hides password, and handles errors.
RETURNS
    Returns a React component that renders a sign-in form.
*/

import React,{useEffect, useState} from 'react'
import { Paper,Divider, TextField, Button, Grid,InputAdornment,IconButton,Container, Collapse } from '@mui/material'
import { Link } from 'react-router-dom'
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import  VisibilityOffIcon  from '@mui/icons-material/VisibilityOff';
import {useDispatch,useSelector} from 'react-redux'
import {login,clearErrors} from '../../actions/userAction'
import {useNavigate} from 'react-router-dom'
import Error from '../error/Error';

const Auth = () => {
    const formRef = React.useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State variables
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [hasError, setHasError] = useState("");
    const [open, setOpen] = useState(true);

    // Function to toggle password visibility
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword =() => setShowPassword(!showPassword);

    //Redux state
    const {error, loading, isAuthenticated, user,isActivated} = useSelector(state => state.user);

    // Function to handle form submission
    const handleSubmit = (e)=>{
        e.preventDefault();
        formRef.current.reportValidity()
        dispatch(login(email,pw))
    }

    // Redirect the user to the home page if they're already authenticated.
    useEffect(() => {
        if (isAuthenticated && user?.isActivated) {
            navigate('/')
        }
        else if(isActivated ){
            navigate('/activate')
        }
    }, [isAuthenticated,user,dispatch,error])

    // Set the error state if there's an error.
    useEffect(() => {
        if (error) {
            setHasError(error)
            setOpen(true)
            dispatch(clearErrors())
        }
    }, [error])
    
    

  return (
    <div>
        <Grid container spacing={0} alignItems="center" justifyContent="center" component='main' sx={{ height: "100vh" }}>
            <Grid item xs={false} sm={4} md={7}>
                <img src={require('../../images/signin.jpg')} className='w-full h-full'/>
            </Grid>

            <Grid item xs={12} sm={8} md={5}>
                <Paper className="m-[50px] p-[50px] rounded-[15px] object-center ">
                    <nav className='flex flex-col justify-center items-center'>
                        <img src={require('../../images/avatar.png')} className='w-8 h-8'/>
                        <strong>Sign In</strong>
                    </nav>
                        <Divider className='m-7'/>
                    <form action="" ref={formRef} onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-7'>
                    <TextField required={true} label="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField required={true} label="Password" onChange={(e)=>{setPw(e.target.value)}}
                            type={showPassword ?"text":"password"}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword?<VisibilityIcon/> :<VisibilityOffIcon/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}          
                    
                    />
                    <a href='/forgotpassword'>Forgot Password?</a>
                    </div>
                    <div className='flex flex-col mt-14 gap-7 align-middle justify-center'>
                        <Button className='text-white bg-[#1da1f2] rounded-full normal-case h-12 text-base' onClick ={handleSubmit} fullWidth>Sign In</Button>
                        <Link className='text-center' to='/signup'>Don't have an account? Sign Up</Link>
                    </div>
                    </form>
                </Paper>
            </Grid>
          </Grid>

          {/* Display error component if there's an error */}
          {
            hasError && 
            <Error hasError={hasError} setOpen={setOpen} open={open}/>
          }
        </div>
  )
}

export default Auth