import React,{useEffect, useState} from 'react'
import { Paper,Divider, TextField, Button, Grid,InputAdornment,IconButton,Container,Input, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import  VisibilityOffIcon  from '@mui/icons-material/VisibilityOff';
import {login,register,clearErrors} from '../../actions/userAction'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Error from '../error/Error';


/*
Signup()
NAME
    Signup
SYNOPSIS
    Signup();
DESCRIPTION
    This React component allows a user to register for an account.
    It provides a form for entering registration details, including an avatar image.
    It dispatches the "register" action to create a new user account.
RETURNS
    Returns a React component that renders a registration form.
*/

const Signup = () => {
    const formRef = React.useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State variables
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [cpw,setCpw] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [avatar,setAvatar] = useState([])
    const [hasError, setHasError] = useState("");
    const [open, setOpen] = useState(true);

    // Function to toggle password visibility
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword =() => setShowPassword(!showPassword);

    //Redux state
    const {error, isLoading, isAuthenticated, user,success } = useSelector(state => state.user);

    // Function to handle form submission
    const handleSubmit = (e)=>{
        e.preventDefault();
        formRef.current.reportValidity()
        if(pw !== cpw){
            setHasError('Password does not match')
            setOpen(true)
        }else{
            
            dispatch(register(name,username,email,pw, avatar[0]))

            if(!hasError){
                navigate('/activate')
            }
        }
        
    }

    // Function to handle image uploads
    const handleImages = (e)=>{
        const files = Array.from(e.target.files);
        setAvatar([]);
        files.forEach((file)=>{
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState=== 2){
                    setAvatar((old)=>[...old, reader.result]);
                }
            }

            reader.readAsDataURL(file);
        });

    }
    
    // Effect to handle and clear errors
    useEffect(() => {
        if (error) {
            setHasError(error)
            setOpen(true)
            dispatch(clearErrors())
        }
    }, [error,dispatch])

  return (
    <div>
        <Grid container spacing={0} alignItems="center" justifyContent="center" component='main' sx={{ height: "100vh" }}>
            <Grid item xs={12} sm={8} md={5}>
                <Paper className="m-[50px] p-[50px] rounded-[15px] object-center ">
                    <nav className='flex flex-col justify-center items-center'>
                        <img src={require('../../images/avatar.png')} className='w-8 h-8'/>
                        <strong>Sign Up</strong>
                    </nav>
                    <Divider className='m-7'/>

                    <form action="" ref={formRef} onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-7'>
                            <div className='flex flex-col gap-0'>
                                <Avatar className='w-40 h-40 mx-auto'>
                                    <img src={avatar} className='w-40 h-40'/>
                                </Avatar>
                                <label htmlFor="myInput"><AddAPhotoIcon className='cursor-pointer text-[#1da1f2] float-right' style={{ fontSize: '30px'}}/></label>
                                <input id="myInput" type="file" fullWidth name='image' accept="image/png image/jpeg image/webp" className='hidden' onChange = {handleImages}/>
                            </div>
                        <TextField required={true} label="Name"  onChange={(e)=>{setName(e.target.value)}}/>
                        <TextField required={true} label="username"  onChange={(e)=>{setUsername(e.target.value)}}/>
                        <TextField required={true} label="Email"  onChange={(e)=>{setEmail(e.target.value)}}/>
                        <TextField required={true} label="Password"  onChange={(e)=>{setPw(e.target.value)}}
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
                        <TextField required={true} label="Confirm Password"  onChange={(e)=>{setCpw(e.target.value)}} type='password'/>
                        </div>
                        <div className='flex flex-col mt-14 gap-7 align-middle justify-center'>
                            <Button className='text-white bg-[#1da1f2] rounded-full normal-case h-12 text-base' onClick ={handleSubmit} fullWidth>Sign Up</Button>
                            <Link className='text-center' to='/login'>Already have an account? Sign In</Link>
                        </div>
                    </form>
                </Paper>
            </Grid>

            <Grid item xs={false} sm={4} md={7}>
                <img src={require('../../images/register.png')} className='w-4/5 h-full'/>
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

export default Signup