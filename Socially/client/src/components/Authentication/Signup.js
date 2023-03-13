import React,{useEffect, useState} from 'react'
import { Paper,Divider, TextField, Button, Grid,InputAdornment,IconButton,Container } from '@mui/material'
import { Link } from 'react-router-dom'
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import  VisibilityOffIcon  from '@mui/icons-material/VisibilityOff';
import {login,register} from '../../actions/userAction'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'



const Signup = () => {
    const formRef = React.useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [cpw,setCpw] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword =() => setShowPassword(!showPassword);
    const {error, isLoading, isAuthenticated, user } = useSelector(state => state.user);


    const handleSubmit = (e)=>{
        e.preventDefault();
        formRef.current.reportValidity()
        if(pw !== cpw){
            alert("Password does not match")
        }else{

            dispatch(register(name,email,pw))
        }
        
        console.log(name,email,pw,cpw)
    }

    // useEffect(() => {
    //     if(!user.isActivated){
    //         navigate('/activate')
    //     }
    // }, [user, dispatch])

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
                        <TextField required={true} label="Name"  onChange={(e)=>{setName(e.target.value)}}/>
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
                        <TextField required={true} label="Confirm Password"  onChange={(e)=>{setPw(e.target.value)}} type='password'/>
                        </div>
                        <div className='flex flex-col mt-14 gap-7 align-middle justify-center'>
                            <Button className='text-white bg-[#1da1f2] rounded-full normal-case h-12 text-base' onClick ={handleSubmit} fullWidth>Sign Up</Button>
                            <Link className='text-center' to='/signin'>Already have an account? Sign In</Link>
                        </div>
                    </form>
                </Paper>
            </Grid>

            <Grid item xs={false} sm={4} md={7}>
                <img src={require('../../images/register.png')} className='w-4/5 h-full'/>
            </Grid>

          </Grid>
        </div>
  )
}

export default Signup