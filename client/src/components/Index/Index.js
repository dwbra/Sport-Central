import React from 'react'
import {Button, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import IndexImage from './index-image2.jpg' 
import styles from './styles.css'

const Index = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if (!user) {
        return (
            <div class="index-container">
                <div class="image-container">
                    <img src={IndexImage} alt="image of hockey players huddled" class="index-image"/>
                </div>
                <div class="login-container">
                    <Typography variant="h2">
                        Welcome to Sport Central
                    </Typography>
                    <br></br>
                    <Typography variant="h3">
                        Want to play but can't find a team?
                    </Typography>
                    <br></br>
                    <Typography variant="h3">
                        Don't worry we got you covered!
                    </Typography>
                    <br></br>
                    <Button component={Link} to="/auth" variant="contained" color="primary" style={{width: '50%', height: '60px', fontSize: '23px'}}>Sign Up/Log In</Button>
                </div>
            </div>
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
