import React from 'react'
import {Grid, Paper, Typography, Button} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Ad from './Ad/Ad.js'
import distanceCalc from '../LocationFinder/distanceCalc';
import {Link} from 'react-router-dom'
import styles from './Ad/styles.css'

const Ads = ({currentId, setCurrentId, distance, lat, lng, gender, compOrCasual, sport, skillLevel}) => {
    // Returns ads as an object of the current state set in the reducer
    const { ads } = useSelector((state) => state.ads)
    const user = JSON.parse(localStorage.getItem('profile'))

    // let d = distanceCalc(ad.gamesLocation.lat[0], ad.gamesLocation.lng[0], props.lat, props.lng)
    // props.lat
    // props.lng
    // props.distance

    // Checks to see if the user is logged in, if not, they will be notified and given a button to log in or sign up
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

    // Returns the ads where the distance is within the parameters set by the user
    return (
            <div className="ads-container">
            <Typography variant="h2">All ads</Typography>
            <Grid container alignItems="stretch" spacing={3}>
                {ads?.map((ad) => {
                    let d = Math.round((distanceCalc(ad.gamesLocationLat[0], ad.gamesLocationLng[0], lat, lng)/1000) * 10) / 10
                    if (d < distance || distance == '') {
                        if (gender === "All" || ad.teamGender === gender){
                            if (compOrCasual === "All" || ad.compOrCasual=== compOrCasual){     
                                if (sport === "All" || ad.sport === sport){  
                                    if (skillLevel === "All" || ad.skillLevel === skillLevel){                          
                                        return(
                                            <Grid key={ad._id} item xs={12} sm={6}>
                                                <Ad ad={ad} setCurrentId={setCurrentId} distance={d} />
                                            </Grid>
                                        )
                                    }
                                }
                            }
                        }
                    }
                })}
            </Grid>
            </div>
    )
}

export default Ads