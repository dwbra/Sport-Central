import React from 'react'
import {Paper, Typography} from '@material-ui/core'

const Home = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user) {
        return(
            <Paper>
                <Typography variant="h6" align="center">
                    Please sign in to view your home feed
                </Typography>
            </Paper>
        )
    } else {
        return (
            <Typography variant="h2">
            This is the Home Page
            </Typography>
        )
    }

}

export default Home