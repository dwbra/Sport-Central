import React from 'react'
import { Paper, Typography} from '@material-ui/core'

const Inbox = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user) {
        return(
            <Paper>
                <Typography variant="h6" align="center">
                    Please sign in to view your inbox
                </Typography>
            </Paper>
        )
    } else {
        return (
            <div>
                <h1>This is the inbox page</h1>
            </div>
        )
    }


}

export default Inbox
