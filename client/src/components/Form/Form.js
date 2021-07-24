import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {createAd, updateAd} from '../../actions/ads.js'


const Form = ({currentId, setCurrentId}) => {

    const [adData, setAdData] = useState({
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
    const ad = useSelector((state) => currentId ? state.ads.find((a) => a._id === currentId) : null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(ad) setAdData(ad)
    }, [ad])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(currentId) {
            dispatch(updateAd(currentId, adData))
        } else {
            dispatch(createAd(adData))
        }
        clear()
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
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} An Add</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth
                    value={adData.creator}
                    onChange={(e) => setAdData({...adData, creator: e.target.value})}
                />
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