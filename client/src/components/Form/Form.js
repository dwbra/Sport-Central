import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {createAd, updateAd} from '../../actions/ads.js'
import LocationFinder from '../LocationFinder/LocationFinder'
import SportsList from '../SportsList/SportsList'
import MultiSlider from '../MultiSlider/MultiSlider'


const Form = ({currentId, setCurrentId}) => {

    const [searchComps, setsearchComps] = useState({
        locationFinderVis: false,
    });


    const [adData, setAdData] = useState({
        teamName: '',
        filled: false,
        sport: '',
        compOrCasual: '',
        clubName: '',
        leagueName: '',
        skillLevel: '',
        teamGender: '',
        gamesLocation: {lat: [0], lng: [0]},
    })
    const user = JSON.parse(localStorage.getItem('profile'))
    const ad = useSelector((state) => currentId ? state.ads.find((a) => a._id === currentId) : null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(ad) setAdData(ad)
    }, [ad])

    function setLocationFinderVis() {
        if (searchComps.locationFinderVis === false) {
            setsearchComps(searchComps => ({
                ...searchComps,
                locationFinderVis: true
            }))
        } else {
            setsearchComps(searchComps => ({
                ...searchComps,
                locationFinderVis: false
            })) 
        }
    }

    function locationBack(lat,lng) {
        setLocationFinderVis()
        setAdData({...adData, 
            gamesLocation: {lat: [lat], lng: [lng]},
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(currentId) {
            dispatch(updateAd(currentId, {...adData, name: user?.result?.name}))
        } else {
            dispatch(createAd({...adData, name: user?.result?.name}))
        }
        clear()
    }

    function sportBack(sport) {
        setAdData({...adData, 
            sport: sport,
        })
    }

    function teamGenderBack(Gender) {
        setAdData({...adData, 
            teamGender: Gender,
        })
    }

    if(!user?.result?.name) {
        return(
            <Paper>
                <Typography variant="h6" align="center">
                    Please sign in to create a sports team ad
                </Typography>
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
            teamGender: '',
            gamesLocation: {lat: [0], lng: [0]},
        })
    }

    return (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} An Add</Typography>
                <SportsList setSport={sportBack}/>
                <TextField 
                    name="teamName" 
                    variant="outlined" 
                    label="Team Name" 
                    fullWidth
                    value={adData.teamName}
                    onChange={(e) => setAdData({...adData, teamName: e.target.value})}
                />

                {/* Mixed ? */}
                <div style={{maxWidth: '50%', margin: 'auto'}}>
                    <MultiSlider setAsking={teamGenderBack} valuesArray={["All Female", "Mixed", "All Male"]} defaultValue={1} title={"Team Gender"}/>
                </div>

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
                <Button onClick={setLocationFinderVis} variant="contained" color="secondary">Set Game Location</Button>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                <LocationFinder trigger={searchComps.locationFinderVis} lat={-33.8688} lng={151.2093} setLocation={locationBack}/>
                
            </form>

        </Paper>
    )
}

export default Form