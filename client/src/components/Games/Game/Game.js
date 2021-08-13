import React from 'react'
import { Card, Typography} from '@material-ui/core'
import moment from 'moment'
import styles from './styles.css'

const Game = ( {game, setCurrentId} ) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    // Returns the game with the game details, with the game object being passed as a destructured variable in the Game object
    return (
        <div style={{width: '100%'}}>
            <Card style={{backgroundColor: '#ededed'}} className="card-items">
                <div className="card-items">
                    <Typography variant="h4">{game.teamName}</Typography>
                    <Typography variant="h6">{game.sport}</Typography>
                    <Typography variant="body2">{moment(game.gamesDateTime).fromNow()}</Typography>
                    <Typography variant="body2" color="textSecondary">{game.skillLevel}</Typography>
                </div>

            </Card>

        </div>
    )
}

export default Game
