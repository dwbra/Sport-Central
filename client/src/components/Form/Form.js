import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {createAd, updateAd} from '../../actions/ads.js'
import {Link} from 'react-router-dom'


const Form = ({currentId, setCurrentId}) => {

    const [adData, setAdData] = useState({
        teamName: '',
        filled: false,
        sport: '',
        compOrCasual: '',
        clubName: '',
        leagueName: '',
        skillLevel: '',
        mixedTeam: false
    })
    const user = JSON.parse(localStorage.getItem('profile'))
    const ad = useSelector((state) => currentId ? state.ads.ads.find((a) => a._id === currentId) : null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(ad) setAdData(ad)
    }, [ad])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(currentId) {
            dispatch(updateAd(currentId, {...adData, name: user?.result?.name}))
        } else {
            dispatch(createAd({...adData, name: user?.result?.name}))
        }
        clear()
    }

    if(!user?.result?.name) {
        return(
            <Paper>
                <Typography variant="h6" align="center">
                    Please sign in to create a sports team ad
                </Typography>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up/Log In</Button>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null)
        setAdData({
            creator: '',
            teamName: '',
            filled: false,
            sport: '',
            compOrCasual: '',
            clubName: '',
            leagueName: '',
            skillLevel: '',
            mixedTeam: false
        })
    }

    return (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h2">{currentId ? 'Editing' : 'Create'} An Ad</Typography>
                <TextField 
                    name="teamName" 
                    variant="outlined" 
                    label="Team Name" 
                    fullWidth
                    value={adData.teamName}
                    onChange={(e) => setAdData({...adData, teamName: e.target.value})}
                />
                <TextField 
                    name="sport" 
                    variant="outlined" 
                    label="Sport" 
                    fullWidth
                    value={adData.sport}
                    onChange={(e) => setAdData({...adData, sport: e.target.value})}
                />
                <TextField 
                    name="skillLevel" 
                    variant="outlined" 
                    label="Skill Level" 
                    fullWidth
                    value={adData.skillLevel}
                    onChange={(e) => setAdData({...adData, skillLevel: e.target.value})}
                />
                <div>
                    {/* <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setAdData({ ...adData, selectedFile: base64})}
                    /> */}
                </div>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                
            </form>

        </Paper>
    )
}

export default Form