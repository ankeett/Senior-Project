import React from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { activateAccount } from '../../actions/userAction';



const Activate = () => {
  const dispatch = useDispatch();
    const {token} = useParams();
    const navigate = useNavigate();
    const {error, success, isLoading, isActivated, user} = useSelector(state=>state.user);
    useEffect(()=>{
        dispatch(activateAccount(token))
    }, [])

    useEffect(()=>{
        if (error){
            navigate("/login")
        }

        
        navigate("/home");
        

    }, [dispatch, error, success, user, isActivated, isLoading])
  return (
    <div></div>
  )
}

export default Activate