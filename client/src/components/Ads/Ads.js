import React from 'react'
import {Grid, Paper, Typography, Button} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Ad from './Ad/Ad.js'
import {Link} from 'react-router-dom'

const Ads = ({ setCurrentId}) => {
    const { ads } = useSelector((state) => state.ads)
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user) {
        return(
            <Paper>
                <Typography variant="h6" align="center">
                    Please sign in to view ads
                </Typography>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up/Log In</Button>
            </Paper>
        )
    }

    return (
            <>
            <Typography variant="h2">Find an Ad</Typography>
            <Grid container alignItems="stretch" spacing={3}>
                {ads?.map((ad) => (
                    <Grid key={ad._id} item xs={12} sm={6}>
                        <Ad ad={ad} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
            </>
    )
}

export default Ads