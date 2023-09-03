import React from 'react'
import { Collapse, IconButton, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


/*
Error()
NAME
    Error
SYNOPSIS
    Error({ hasError, setOpen, open });
DESCRIPTION
    This React component displays an error message in a collapsible alert.
    It takes the error message, a function to control the opening/closing of the alert, and the alert's current state as props.
RETURNS
    Returns a React component that displays an error message in a collapsible alert.
*/

const Error = ({hasError,setOpen,open}) => {
  return (
    <div>
        <Collapse in={open}>
            <Alert 
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                    setOpen(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
                severity= "error" variant='filled' className='fixed bottom-0 right-0 m-5'>{hasError}</Alert>
        </Collapse>
    </div>
  )
}

export default Error