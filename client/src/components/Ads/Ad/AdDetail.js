import React, {useState, useEffect} from 'react'
import { Paper, Typography, Button ,TextField} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { createGame } from '../../../actions/games.js'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { getAd } from '../../../actions/ads.js'
import {Link} from 'react-router-dom'

const AdDetail = () => {
    const {ad, ads} = useSelector((state) => state.ads)
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('profile'))

    const [adPos, setadPos] = useState({
        adPosNumber: 1,
    });

    useEffect(() => {
        dispatch(getAd(id))
    }, [id])

    const createGamesFromAd = () => {
      // sending id to games POST
      dispatch(createGame({adId: id , playerId: user?.result?._id, gameNumber: adPos.adPosNumber}))
    }

    const updateGameNumber = (e) => {
        const re = /^[0-9\b]+$/;
        if ((e.target.value === '' || re.test(e.target.value)) && e.target.value > -1) {
          setadPos(adPos => ({
              adPosNumber: e.target.value,
          }))
        }
    }

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
            <Button onClick={createGamesFromAd} variant="contained" color="primary">*TEMP FOR TESTING* Create games from this AD</Button>
            <TextField 
                style={{margin: '10px'}}
                id="adPosition"
                name="adPosition"
                label="Ad position"
                type="number"
                onChange={(e) => updateGameNumber(e)}
                value={adPos.adPosNumber}
            />
          </div>
        </div>
      </Paper>
    )
  }
}

export default AdDetail
