import React from 'react'
import {Paper, Typography, Grid} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Ad from '../Ads/Ad/Ad.js'
import Game from '../Game/Game.js'

const Home = ({setCurrentId}) => {
    const {ads } = useSelector((state) => state.ads)
    //const {games } = useSelector((state) => state.games)
    const user = JSON.parse(localStorage.getItem('profile'))

    const gamesList = [1,2,3]
    // const gamesList = games.filter(function(game) {
    //     return user?.result?._id === game?.playerId
    // })

    const adsList = ads.filter(function(ad) {
        return user?.result?._id === ad?.creatorId  // || user?.result?.googleId === ad?.creatorId
    })



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
            <div style={{maxWidth: '70%', margin: 'auto'}}>
                <Typography variant="h4">Your Game</Typography>
                {(() => {
                    if (gamesList.length > 0){
                        return (
                            <Grid container alignItems="stretch" spacing={3}>
                                {gamesList.map((game) => (
                                    <Grid key={game} item xs={12} sm={6}> 
                                        <Game/>
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    } else {
                        return (
                            <Typography variant="body1">You have no games</Typography>
                        )
                    }
                })()}
                <Typography variant="h4">Your Ads</Typography>
                {(() => {
                    if (adsList.length > 0){
                        return (
                            <Grid container alignItems="stretch" spacing={3}>
                                {adsList.map((ad) => (
                                    <Grid key={ad._id} item xs={12} sm={6}>
                                        <Ad ad={ad} setCurrentId={setCurrentId}/>
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    } else {
                        return (
                            <Typography variant="body1">You have no ads</Typography>
                        )
                    }
                })()}
            </div>
        )
    }
}

export default Home