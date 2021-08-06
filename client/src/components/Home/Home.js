import React from 'react'
import {Paper, Typography, Grid} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Ad from '../Ads/Ad/Ad.js'
import Games from '../Games/Games.js'
import Game from '../Games/Game/Game.js'

const Home = ({setCurrentId}) => {
    const {ads } = useSelector((state) => state.ads)
    const { games } = useSelector((state) => state.games)
    const user = JSON.parse(localStorage.getItem('profile'))
    const result = ads.filter(function(ad) {
        return user?.result?.googleId === ad?.creatorId || user?.result?._id === ad?.creatorId
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
            <Typography variant="h4">Your Upcoming Games</Typography>
            <Grid container alignItems="stretch" spacing={3}>
                {games.map((game) => (
                    <Grid key={game._id} item xs={12} sm={6}>
                        <Game game={game} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4">Your Ads</Typography>
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