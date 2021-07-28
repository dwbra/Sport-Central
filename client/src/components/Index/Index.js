import React from 'react'
import {Button, Typography, Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'

const Index = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if (!user) {
        return (
            <Paper>
                <Typography variant="h2">
                This is the Index Page
                </Typography>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up/Log In</Button>
            </Paper>

        )
    } else {
        return (
            <Typography variant="h2">
            This is the Index Page
            </Typography>
        )
    }
}

export default Index
