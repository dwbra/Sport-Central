import React from 'react'
import { Paper, Typography} from '@material-ui/core'

const Inbox = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user) {
        return(
            <Paper>
                <Typography variant="h2" align="center">
                    Please sign in to view your inbox
                </Typography>
            </Paper>
        )
    } else {
        return (
            <Typography variant="h2">
            This is the Inbox Page
            </Typography>
        )
    }
}

export default Inbox
