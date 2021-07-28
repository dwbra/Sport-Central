import React from 'react'
import {Grid, CircularProgress, Paper, Typography} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Ad from './Ad/Ad.js'

const Ads = ({ currentId ,setCurrentId}) => {
    const ads = useSelector((state) => state.ads)
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user) {
        return(
            <Paper>
                <Typography variant="h6" align="center">
                    Please sign in to view ads
                </Typography>
            </Paper>
        )
    }

    return (
        // !ads.length ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {ads.map((ad) => (
                    <Grid key={ad.id} item xs={12} sm={6}>
                        <Ad ad={ad} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        // )
    )
}

export default Ads