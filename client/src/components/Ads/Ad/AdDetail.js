import React, {useState, useEffect} from 'react'
import { Paper, Typography, Button, Box} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { createGame } from '../../../actions/games.js'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { getAd } from '../../../actions/ads.js'
import { applyForPosition } from '../../../actions/adInteract.js'
import {Link} from 'react-router-dom'

const AdDetail = () => {

    const [userState, setUserState] = useState({
        action: false,
    });

    const {ad} = useSelector((state) => state.ads) // removed ads
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('profile'))


    useEffect(() => {
        dispatch(getAd(id))
    }, [id, dispatch])

    
    const actionTaken = () => {
      console.log("clicked")
        if (userState.action === false) {
          setUserState({ action: true })
        } else {
          setUserState({ action: false })
          window.location.reload(false)
        }
    }

    const acceptApplicant = (i) => {
      // sending id to games POST
      actionTaken()
      dispatch(createGame({adId: id , playerId: ad.applicantIds[i], adPosNumber: ad.applicantPosition[i]}))
    }

    const applyForPos = (playerGenders, i) => {
      // non owner applying for a position
      actionTaken()
      dispatch(applyForPosition({adId: id , applicantId: user?.result?._id, applicantName: user?.result?.name, applicantGender: playerGenders, applicantPosition: i}))
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
            <Typography variant="h6">Date time: {ad.gamesDateTime[0]}</Typography>
            <Typography gutterBottom variant="body1" component="p">{moment(ad.createdAt).fromNow()}</Typography>
            {(() => {
                if (ad.creatorId === user?.result?._id) {
                  if (userState.action === false){
                    if (ad.applicantIds.length === 0) {
                      return (
                        <Typography variant="h6">No applicants yet</Typography>
                      )
                    }else {
                      let array = []
                      for(var i = 0; i < ad.playerGenders.length ; i++) {
                        array.push(i)
                      }
                      return (
                        <div>
                            {array.map((i)=>(
                              <div key={'applicant'+i} style={{ padding: '5px', maxWidth: '400px' }}> 
                                <Box borderRadius="borderRadius" border={1} >
                                    <Typography variant="body1">Applicant Name: {ad.applicantName[i]}</Typography>
                                    <Typography variant="body1">Applicant Gender: {ad.applicantGender[i]}</Typography>
                                    <Typography variant="body1">Applicant applied for position: {ad.applicantPosition[i]}</Typography>
                                    {(() => {
                                      if (ad.filled[i] === false){
                                        return (
                                          <Button onClick={(e) =>acceptApplicant(i)} variant="contained" color="secondary">Accept {ad.applicantName[i]} onto team</Button>
                                        )
                                      } else {
                                        return (
                                          <Typography variant="body1">Position Already Filled</Typography>
                                        )
                                      }
                                    })()}
                                      
                                </Box>
                              </div>
                            ))}
                        </div>
                      )
                    }
                  } else {
                      return (
                          <div style={{marginTop: '30px',marginLeft: '25%', maxWidth: '50%'}}>
                              <Typography variant="h6">Applicant Accepted</Typography>
                              <Button variant="contained" color="primary" size="large" onClick={(e) => actionTaken(e)} fullWidth>OK</Button>
                          </div>
                      )
                  }
                } else {
                  if (userState.action === false){
                    let array = []
                    for(i = 0; i < ad.playerGenders.length ; i++) {
                      array.push(i)
                    }
                    return (
                      <div>
                        {array.map((i)=>(
                        <div key={'applicant'+i} style={{ padding: '5px', maxWidth: '300px' }}> 
                            <Box borderRadius="borderRadius" border={1} >
                            <Typography variant="body1">Position Number: {i+1}</Typography>
                            <Typography variant="body1">Position Gender: {ad.playerGenders[i]}</Typography>
                            {(() => {
                              if (ad.filled[i] === false){
                                return (
                                  <Button onClick={(e) => applyForPos(ad.playerGenders[i], i+1)} variant="contained" color="secondary">Apply for this position</Button>
                                )
                              } else {
                                return (
                                  <Typography variant="body1">Position Already Filled</Typography>
                                )
                              }
                            })()}
                            </Box>  
                        </div>
                        ))}
                      </div>
                    )
                  }else {
                      return (
                          <div style={{marginTop: '30px',marginLeft: '25%', maxWidth: '50%'}}>
                              <Typography variant="h6">You Have Applied </Typography>
                              <Button variant="contained" color="primary" size="large" onClick={(e) => actionTaken(e)} fullWidth>OK</Button>
                          </div>
                      )
                  }
                }
            })()} 
          </div>
        </div>
      </Paper>
    )
  }
}

export default AdDetail
