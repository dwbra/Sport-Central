import React from 'react'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

const Index = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if (!user) {
        return (
            <div>
                <h1>Welcome to Sport Central, this is the index page</h1>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up/Log In</Button>
            </div>
        )
    } else {
        return (
            <div>
                <h1>This is the index page</h1>
            </div>
        )
    }
}

export default Index
