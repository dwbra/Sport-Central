import React from 'react'
import { Card, CardActions, Button, Typography, ButtonBase } from '@material-ui/core'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteAd } from '../../../actions/ads.js'
import { useHistory } from 'react-router'

const Ad = ( { ad, setCurrentId, distance} ) => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory()

    // Onclick function that uses the useHistory router to re-direct a user to a specific ad once they click on the preview
    const openAd = () => {
        history.push(`/explore/${ad._id}`)
    }

    // Onclick function that redirects a user to the create route but also prefills the ad form with the .id of the clicked ad
    const updateAd = (e) => {
        e.preventDefault()

        setCurrentId(ad._id)
        history.push(`/create`)
    }

    //   Returns the details of the ad, and only shows the update or delete buttons if the isCreator function returns true
    return (
        <Card>
        <ButtonBase onClick={openAd}>
            <div>
                <Typography variant="h4">{ad.teamName}</Typography>
                <Typography variant="h6">{ad.sport}</Typography>
                <Typography variant="body2">{moment(ad.createdAt).fromNow()}</Typography>
                <Typography variant="body2">Date time: {ad.gamesDateTime[0]}</Typography>
                <Typography variant="body1">distance away {distance} km</Typography>
            </div>
            <div>
                <Typography variant="body2" color="textSecondary">{ad.skillLevel}</Typography>
            </div>
        </ButtonBase>
            <CardActions>
            {(user?.result?.googleId === ad?.creatorId || user?.result?._id === ad?.creatorId) && (
                <Button style={{color: 'black'}} size="small" onClick={updateAd}>
                Update
                </Button>
             
            )}
            {(user?.result?.googleId === ad?.creatorId || user?.result?._id === ad?.creatorId) && (
                <Button style={{color: 'red'}} size="small" onClick={() => dispatch(deleteAd(ad._id))}>
                    Delete
                </Button>
            )}   
            </CardActions>
        </Card>
    )
}

export default Ad