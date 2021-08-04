import React from 'react'
import { Card, CardActions, Button, Typography, ButtonBase } from '@material-ui/core'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

const Game = ( {game, setCurrentId} ) => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory()

    return (
        <div>
            <Typography variant="h4">{game.teamName}</Typography>
            <Typography variant="h6">{game.sport}</Typography>
            <Typography variant="body2">{moment(game.gamesDateTime).fromNow()}</Typography>
        </div>
    )
}

export default Game
