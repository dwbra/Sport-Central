import React from 'react'
import {Paper, Typography, Grid} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Ad from '../Ads/Ad/Ad.js'
import Ads from '../Ads/Ads.js'
import { useHistory } from 'react-router'

const Home = ( setCurrentId) => {
    const {ads } = useSelector((state) => state.ads)
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))
    const result = ads.filter(function(ad) {
        return user?.result?.googleId === ad?.creator || user?.result?._id === ad?.creator
    })
    console.log(result)

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
            <>
            <Typography variant="h4">Your Ads</Typography>
            {/* <Ads /> */}
            <Grid container alignItems="stretch" spacing={3}>
                {result.map((ad) => (
                    <Grid key={ad._id} item xs={12} sm={6}>
                        <Ad ad={ad} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
            </>
        )
    }
}

export default Home