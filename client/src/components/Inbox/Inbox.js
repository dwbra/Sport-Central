import React from 'react'
import {Button, Typography, Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'
import AllMessages from '../Message/AllMessages.js'
import Messages from '../Message/Messages.js'

const Inbox = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user) {
        return(
            <Paper>
                <Typography variant="h2" align="center">
                    Please sign in to view your inbox
                </Typography>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up/Log In</Button>
            </Paper>
        )
    } else {
        return (
            <>
            <Typography variant="h2">
            This is the Inbox Page
            </Typography>
            <AllMessages />
            </>
        )
    }
}

export default Inbox
