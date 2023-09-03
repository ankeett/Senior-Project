import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getNotifications, readAllNotification } from '../../actions/notificationAction'

import { Avatar, Card} from '@mui/material'
import { useNavigate } from 'react-router-dom'


/*
Notifications()
NAME
    Notifications
SYNOPSIS
    Notifications();
DESCRIPTION
    This React component displays a list of user notifications.
    It fetches notifications from the Redux store and sorts them by date.
    Users can click on notifications to navigate to the associated links.
RETURNS
    Returns a React component that renders the list of notifications and handles user interactions.
*/
const Notifications = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notifications = useSelector(state => state.notifications)

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  return (
    <div>
      <strong className='font-semibold'>Notifications</strong>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-3 w-3/4'>

            {
              notifications &&
              notifications.notifications
                .slice() // Create a shallow copy to avoid modifying the original array
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((n) => (
                  <Card
                    key={n._id} // Don't forget to add a unique key for each element in the map
                    className='mt-5 p-3 cursor-pointer hover:mb-1 hover:font-semibold flex flex-row gap-2'
                    onClick={() => {
                      return (
                        navigate(n.link)
                      )
                    }
                  }
                  >
                      <Avatar>
                        <img src={n.sender.avatar.url} alt={n.name}  className='w-full h-full'/>
                      </Avatar>
                    <p>{n.message}</p>
                  </Card>
                ))
            }

          </div>
        </div>
      </div>
  )
}

export default Notifications