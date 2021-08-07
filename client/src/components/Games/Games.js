import React from 'react'
import {Grid, Paper, Typography, Button} from '@material-ui/core'
import Game from './Game/Game.js'
import {useSelector} from 'react-redux'

const Games = ( {setCurrentId} ) => {
    // UseSelector from redux to set the games object as the current state of the reducer object
    const  { games }  = useSelector((state) => state.games)
    const user = JSON.parse(localStorage.getItem('profile'))

    // Returns the grid of all games, with the game passed on as a 
    return (
            <>
            <Typography variant="h2">All games</Typography>
            <Grid container alignItems="stretch" spacing={3}>
                {games?.map((game) => (
                    <Grid key={game._id} item xs={12} sm={6}>
                        <Game game={game} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
            </>
    )
}

export default Games
