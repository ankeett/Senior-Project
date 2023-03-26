import React from 'react'
import {Container,Paper, Typography,CardMedia} from '@mui/material'

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
                
                <Typography >We will send you a confirmation e-mail shortly with an activation link to start with Socially.</Typography>

            </Paper>
        </Container>

    </div>
  )
}

export default CheckForget
