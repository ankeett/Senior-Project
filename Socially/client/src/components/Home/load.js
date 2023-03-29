import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { loadUser } from '../../actions/userAction'

const LoadDetails = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)

    useEffect(()=>{
        dispatch(loadUser())
      },[dispatch])

  return (
    <div>
        
    </div>
  )
}

export default LoadDetails