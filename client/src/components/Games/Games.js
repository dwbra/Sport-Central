import React from 'react'
import {Grid, Paper, Typography, Button} from '@material-ui/core'
import Game from './Game/Game.js'
import {useSelector} from 'react-redux'

const Games = ( {setCurrentId} ) => {
    const  { games }  = useSelector((state) => state.games)
    const user = JSON.parse(localStorage.getItem('profile'))
    useSelector((state) => console.log(state))
    console.log(games)

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
