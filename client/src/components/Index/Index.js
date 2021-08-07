import React from 'react'
import {Button, Typography, Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'

const Index = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if (!user) {
        return (
            <Paper>
                <Typography variant="h2">
                Welcome to Sport Central
                </Typography>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up/Log In</Button>
            </Paper>

        )
    } else {
        return (
            <>
                <Typography variant="h3"> Welcome to Sport Central</Typography>
                <Typography variant="h4"> View all your upcoming game and Ads on the home tap</Typography>
                <Typography variant="h4"> Looking for a player for your team? Creates an ad on the "Create A Team Tab"</Typography>
                <Typography variant="h4"> Looking for a Team? On the "Find A Team" tab you can search one</Typography>
            </>
        )
    }
}

export default Index
