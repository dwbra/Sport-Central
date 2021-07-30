import React from 'react'
import { Card, CardActions, Button, Typography, ButtonBase } from '@material-ui/core'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteAd } from '../../../actions/ads.js'
import { useHistory } from 'react-router'

const Ad = ( { ad, setCurrentId } ) => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory()

    const openAd = () => {
        history.push(`/explore/${ad._id}`)
    }

    const updateAd = (e) => {
        e.preventDefault()

        setCurrentId(ad._id)
        history.push(`/create`)
    }

    return (
        <Card>
        <ButtonBase onClick={openAd}>
            <div>
                <Typography variant="h4">{ad.teamName}</Typography>
                <Typography variant="h6">{ad.sport}</Typography>
                <Typography variant="body2">{moment(ad.createdAt).fromNow()}</Typography>
                <Typography variant="body2" color="textSecondary">{ad.skillLevel}</Typography>
            </div>
        </ButtonBase>
            <CardActions>
            {(user?.result?.googleId === ad?.creator || user?.result?._id === ad?.creator) && (
                <Button style={{color: 'black'}} size="small" onClick={updateAd}>
                Update
                </Button>
             
            )}
            {(user?.result?.googleId === ad?.creator || user?.result?._id === ad?.creator) && (
                <Button style={{color: 'red'}} size="small" onClick={() => dispatch(deleteAd(ad._id))}>
                    Delete
                </Button>
            )}   
            </CardActions>
        </Card>
    )
}

export default Ad