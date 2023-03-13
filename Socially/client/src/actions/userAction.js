import axios from 'axios';

const host = "http://localhost:4000";

export const register = (name,email,password) => async(dispatch)=>{
    try{
        dispatch({type:"REGISTER_REQUEST"});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true,
            
        }

        const {data} = await axios.post(`${host}/api/register`,
            {name,email,password}
            ,config
        );
        console.log('sdf')
        dispatch({type:"REGISTER_SUCCESS",payload:data.user});
            
    }
    catch(error){
        dispatch({type:"REGISTER_FAIL",payload:error.response.data.message});
    }
}

export const login = (email,password) => async(dispatch)=>{
    try{
        dispatch({type:"LOGIN_REQUEST"});
        const config = {
            headers:{"Content-type":"application/json"},
            withCredentials: true
        }

        const {data} = await axios.post(`${host}/api/login`,
            {email,password}
            ,config
        );
        console.log('sdf')

        dispatch({type:"LOGIN_SUCCESS",payload:data.user});
        console.log('login success')

    }
    catch(error){
        dispatch({type:"LOGIN_FAIL",payload:error.response.data.message});
    }
}