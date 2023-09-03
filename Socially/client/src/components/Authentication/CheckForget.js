import React from 'react'
import {Container,Paper, Typography,CardMedia} from '@mui/material'

/*
CheckForget()
NAME
    CheckForget
SYNOPSIS
    CheckForget();
DESCRIPTION
    This React component is displayed to the user after they have initiated a password reset request.
    It informs the user that a confirmation email will be sent with instructions for resetting their password.
RETURNS
    Returns a React component that displays a message to the user.
*/

const CheckForget = () => {
  return (
    <div>
        <Container component = 'main' maxWidth ='xs'>
            <Paper elevation={3} className=" mt-16 flex flex-col justify-center items-center p-10">
                <CardMedia
                    component="img"
                    height="230"
                    image={require('../../images/email.png')}
                    alt="Buy"
                />
                <div className='p-[20px]  mb-[20px] text-center'>
                    <Typography>Thank You!</Typography>
                </div>
                
                <Typography >We will send you a confirmation e-mail shortly with an activation link to start with Beacon.</Typography>

            </Paper>
        </Container>

    </div>
  )
}

export default CheckForget
