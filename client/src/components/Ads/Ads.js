import React from 'react'
import {Grid, Paper, Typography, Button} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Ad from './Ad/Ad.js'
import distanceCalc from '../LocationFinder/distanceCalc';
import {Link} from 'react-router-dom'

const Ads = ({ setCurrentId}) => {
    const { ads } = useSelector((state) => state.ads)
    const user = JSON.parse(localStorage.getItem('profile'))

    // let d = distanceCalc(ad.gamesLocation.lat[0], ad.gamesLocation.lng[0], props.lat, props.lng)
    // props.lat
    // props.lng
    // props.distance

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

                {ads?.map((ad) => {
                    let d = Math.round((distanceCalc(ad.gamesLocation.lat[0], ad.gamesLocation.lng[0], lat, lng)/1000) * 10) / 10
                    if (d < distance) {
                        return(
                            <Grid key={ad.id} item xs={12} sm={6}>
                                <Ad ad={ad} setCurrentId={setCurrentId} distance={d} />
                            </Grid>
                        )

                    }
                })}
            </Grid>
            </>
    )
}

export default Ads