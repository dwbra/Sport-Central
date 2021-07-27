import React from 'react'
import { Card, CardActions, Button, Typography } from '@material-ui/core'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteAd } from '../../../actions/ads.js'

const Ad = ( { ad, setCurrentId } ) => {
    const dispatch = useDispatch()

    return (
        <Card>
            <div>
                <Typography variant="h4">{ad.teamName}</Typography>
                <Typography variant="h6">{ad.sport}</Typography>
                <Typography variant="body2">{moment(ad.createdAt).fromNow()}</Typography>
            </div>
            <div>

            </div>
            <div>
                <Typography variant="body2" color="textSecondary">{ad.skillLevel}</Typography>
            </div>
            <CardActions>
                <Button style={{color: 'black'}} size="small" onClick={() => setCurrentId(ad._id)}>
                    Update
                </Button>
                <Button style={{color: 'red'}} size="small" onClick={() => dispatch(deleteAd(ad._id))}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Ad