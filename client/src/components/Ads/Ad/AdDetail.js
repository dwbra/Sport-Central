import React, {useEffect} from 'react'
import { Paper, Typography, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useHistory, useParams } from 'react-router-dom'
import { getAd } from '../../../actions/ads.js'
import {Link} from 'react-router-dom'

const AdDetail = () => {
    const {ad, ads} = useSelector((state) => state.ads)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('profile'))

    console.log(ad)

    useEffect(() => {
        dispatch(getAd(id))
    }, [id])

    if(!ad) return (null)

    if(!user) {
      return(
          <Paper>
              <Typography variant="h6" align="center">
                  Please sign in to view the details of this listing
              </Typography>
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up/Log In</Button>
          </Paper>
      )
  } else {
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div>
          <div>
            <Typography variant="h3" >Team Name: {ad.teamName}</Typography>
            <Typography variant="h4">Sport: {ad.sport}</Typography>
            <Typography variant="h6">Created by: {ad.name}</Typography>
            <Typography variant="h6">Skill Level: {ad.skillLevel}</Typography>
            <Typography gutterBottom variant="body1" component="p">{moment(ad.createdAt).fromNow()}</Typography>
          </div>
        </div>
      </Paper>
    )
  }
}

export default AdDetail
