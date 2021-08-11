import React from 'react'
import {Paper, Typography, Grid} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Ad from '../Ads/Ad/Ad.js'
import Games from '../Games/Games.js'
import Game from '../Games/Game/Game.js'

const Home = ({setCurrentId}) => {
    // Destructures the ad object from the useSelector state, fetched from the reducer actions
    const {ads } = useSelector((state) => state.ads)
    // Destructures the games object from the useSelector state, fetched from the reducer actions
    const { games } = useSelector((state) => state.games)
    // Retrieves the profile of the signed in user stored in localstorage and sets their details as a variable user
    const user = JSON.parse(localStorage.getItem('profile'))
    // Filters from all the ads in the database to only retreieve the ads where the user created the ad
    const result = ads.filter(function(ad) {
        return user?.result?.googleId === ad?.creatorId || user?.result?._id === ad?.creatorId
    })
    //useSelector((state) => console.log(state))

    const yourGames = games.filter(function(game) {
        return user?.result?.googleId === game?.playerId || user?.result?._id === game?.playerId
    })

    // Checks if the user is sign in, if not they will be prompted to sign in
    if(!user) {
        return(
            <Paper>
                <Typography variant="h6" align="center">
                    Please sign in to view your home feed
                </Typography>
            </Paper>
        )
        // If the user is signed in, it will display their upcoming games and also the ads they have created on the screen
    } else {
        return (
            <>
            <Typography variant="h4" style={{margin: '10px'}}>Your Upcoming Games</Typography>
            {(() => {
                if (yourGames.length > 0) {
                    return (
                        <Grid container alignItems="stretch" spacing={3}>
                            {yourGames.map((game) => (
                                <Grid key={game._id} item xs={12} sm={6}>
                                    <Game game={game} setCurrentId={setCurrentId}/>
                                </Grid>
                            ))}
                        </Grid>
                    )
                } else {
                    return (
                        <Typography variant="h6" style={{margin: '10px'}}>You have no game at the moment</Typography>
                    )
                }
            })()} 
            <Typography variant="h4" style={{margin: '10px'}}>Your Ads</Typography>
            {(() => {
                if (result.length > 0) {
                    return (
                        <Grid container alignItems="stretch" spacing={3}>
                            {result.map((ad) => (
                                <Grid key={ad._id} item xs={12} sm={6}>
                                    <Ad ad={ad} setCurrentId={setCurrentId}/>
                                </Grid>
                            ))}
                        </Grid>
                    )
                } else {
                    return (
                        <Typography variant="h6" style={{margin: '10px'}}>You have no ads at the moment</Typography>
                    )
                }
            })()} 
            </>
        )
    }
}

export default Home