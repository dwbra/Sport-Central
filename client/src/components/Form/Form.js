import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper, Checkbox, Box, FormControlLabel, InputLabel } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {createAd, updateAd} from '../../actions/ads.js'
import {Link} from 'react-router-dom'
import LocationFinder from '../LocationFinder/LocationFinder'
import SportsList from '../SportsList/SportsList'
import MultiSlider from '../MultiSlider/MultiSlider'


const Form = ({currentId, setCurrentId}) => {

    const [searchComps, setsearchComps] = useState({
        locationFinderVis: false,
        numberOfPlayersNeeded: 1,
        sameLocation: true,
        locationIndex: 0,
    });


    const [adData, setAdData] = useState({
        teamName: '',
        filled: false,
        sport: '',
        compOrCasual: "Casual",
        numberOfGames: 1,
        clubName: '',
        leagueName: '',
        skillLevel: "Casual",
        teamGender: "Mixed",
        gameLength: 90,
        gamesLocation: {lat: [0], lng: [0]},
        gamesDateTime: [0],
        playerGenders: ["Male"],
    })
    const user = JSON.parse(localStorage.getItem('profile'))
    const ad = useSelector((state) => currentId ? state.ads.ads.find((a) => a._id === currentId) : null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(ad) setAdData(ad)
    }, [ad])

    function setLocationFinderVis(i) {
        if (searchComps.locationFinderVis === false) {
            setsearchComps(searchComps => ({
                ...searchComps,
                locationFinderVis: true,
                locationIndex: i,
            }))
        } else {
            setsearchComps(searchComps => ({
                ...searchComps,
                locationFinderVis: false,
                locationIndex: i,
            })) 
        }
    }

    function sportBack(sport) {
        setAdData({...adData, 
            sport: sport,
        })
    }

    function locationBack(lat,lng,index) {
        //console.log("game index ", index) 
        setLocationFinderVis(0)
        if (index === 0) {
            setAdData({...adData, 
                gamesLocation: {lat: [lat], lng: [lng]},
            })
        } else {
            const current = adData.gamesLocation
            //console.log(current.lat)    
            current.lat.splice(index, 1, lat)
            current.lng.splice(index, 1, lng)
            setAdData({...adData, 
                gamesLocation: current,
            })  
        }
    }

    function playerGenderBack(gender,index) {  
        if (index === 0) {
            setAdData({...adData, 
                playerGenders: [gender],
            })
        } else {
            const current = adData.playerGenders        
            current.splice(index, 1, gender)
            setAdData({...adData, 
                playerGenders: current,
            })  
        }
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


    function compOrCasualBack(compOrCasual) {
        setAdData({...adData, 
            compOrCasual: compOrCasual,
        })
    }

    function updateGamesNumber(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value) && e.target.value < 26 && e.target.value > 0) {
            let location = adData.gamesLocation
            let dateTime = adData.gamesDateTime
            if (dateTime.length < e.target.value ) {
                while (dateTime.length != e.target.value){
                    dateTime.push("")
                    location.lat.push(0)
                    location.lng.push(0)
                }
            } 
            if (dateTime.length > e.target.value ) {
                while (dateTime.length != e.target.value ){
                    dateTime.splice(dateTime.length-1, 1)
                    location.lat.splice(dateTime.length-1, 1)
                    location.lng.splice(dateTime.length-1, 1)
                }
            }
            setAdData({...adData, 
               gamesDateTime: dateTime,
               gamesLocation: location,
               numberOfGames: e.target.value,
            }) 
        }
    }
    
    function updateNumberOfPlayersNeeded(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value) && e.target.value < 11 && e.target.value > 0) {
            setsearchComps({...searchComps, 
                numberOfPlayersNeeded: e.target.value,
            })
            let current = adData.playerGenders
            if (current.length < e.target.value ) {
                while (current.length != e.target.value){
                    current.push("Male")
                }
            } 
            if (current.length > e.target.value ) {
                while (current.length != e.target.value ){
                    current.splice(current.length-1, 1)
                }
            }
            setAdData({...adData, 
               playerGenders: current,
            }) 
        }
    }

    function updategameLength(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value) && e.target.value > 0) {
            setAdData({...adData, 
                gameLength: e.target.value,
            })
        }
    }

    function sameLocationChange(event) {
        setsearchComps({...searchComps, 
            sameLocation: event.target.checked,
        })
    }

    function teamGenderBack(gender) {
        setAdData({...adData, 
            teamGender: gender,
        })
    }

    function skillLevelBack(skill) {
        setAdData({...adData, 
            skillLevel: skill,
        })
    }

    function updateDateTime(dt , index) {
        if (index === 0) {
            setAdData({...adData, 
                gamesDateTime: [dt.target.value],
            })
        } else {
            const current = adData.gamesDateTime        
            current.splice(index, 1, dt.target.value)
            setAdData({...adData, 
                gamesDateTime: current,
            })  
        }
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
            teamName: '',
            filled: false,
            sport: '',
            compOrCasual: "Casual",
            numberOfGames: 1,
            clubName: '',
            leagueName: '',
            skillLevel: "Casual",
            teamGender: "Mixed",
            gameLength: 90,
            gamesLocation: {lat: [0], lng: [0]},
            gamesDateTime: [0],
            playerGenders: ["Male"],
        })
    }

    return (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{maxWidth: '50%', margin: 'auto'}}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} An Add</Typography>

                {/* sport? */}
                <SportsList setSport={sportBack}/>

                {/* Casual or comp ? */}
                <MultiSlider setAsking={compOrCasualBack} valuesArray={["Casual", "Competition"]} defaultValue={0} title={"Game Types"}/>
                
                {/* Mixed ? */}
                <MultiSlider setAsking={teamGenderBack} valuesArray={["All Female", "Mixed", "All Male"]} defaultValue={1} title={"Team Gender"}/>

                {(() => {
                    if (adData.compOrCasual === "Competition") {
                        return (
                            <div>
                                {/* clubName or comp ? */}
                                <TextField 
                                    style={{margin: '10px'}}
                                    id="club-name"
                                    name="clubName"
                                    label="Club Name"
                                    fullWidth
                                    onChange={(e) => setAdData({...adData, clubName: e.target.value})}
                                    value={adData.clubName}
                                />
                                {/* leagueName ? */}
                                <TextField 
                                    style={{margin: '10px'}}
                                    id="league-name"
                                    name="leagueName"
                                    label="League Name"
                                    fullWidth
                                    onChange={(e) => setAdData({...adData, leagueName: e.target.value})}
                                    value={adData.leagueName}
                                />
                            </div>
                        )
                    }
                })()} 
                
                {/* teamName ? */}
                <TextField 
                    style={{margin: '10px'}}
                    id="team-name"
                    name="teamName"  
                    label="Team Name" 
                    fullWidth
                    value={adData.teamName}
                    onChange={(e) => setAdData({...adData, teamName: e.target.value})}
                />

                {/* Game length */}
                <TextField 
                    style={{margin: '10px'}}
                    id="gameLength"
                    name="gameLength"
                    label="Game length in min"
                    fullWidth
                    type="number"
                    onChange={(e) => updategameLength(e)}
                    value={adData.gameLength}
                />

                {/* Skill Level ? */}
                <MultiSlider setAsking={skillLevelBack} valuesArray={["Noob", "Casual", "Armature", "Quite Good", "Pro"]} defaultValue={1} title={"Skill Level"}/>

                {/* number of player needed ? */}
                <TextField 
                    style={{margin: '10px'}}
                    id="number-of-players-needed"
                    name="numOfPlayers"
                    label="Number of Players Needed - (no more then 10)"
                    fullWidth
                    type="number"
                    onChange={(e) => updateNumberOfPlayersNeeded(e)}
                    value={searchComps.numberOfPlayersNeeded}
                />
                
                {/* each needed players gender */}
                {/* mapped based on the number of players needed and if Game is mixed*/}
                {(() => {
                    if(adData.teamGender === "Mixed" && searchComps.numberOfPlayersNeeded < 2) {
                        return (
                            <div>
                                <MultiSlider setAsking={playerGenderBack} valuesArray={["Female", "Male"]} defaultValue={1} title={"Player Gender"}/>
                            </div>
                        )
                    } else if(adData.teamGender === "Mixed") {
                        let array = []
                        for(var i = 0; i < searchComps.numberOfPlayersNeeded ; i++) {
                            array.push(i)
                        }
                        return (
                            <div>
                                {array.map((i)=>(
                                    <div key={'player gender'+i}> 
                                        <MultiSlider setAsking={playerGenderBack} valuesArray={["Female", "Male"]} defaultValue={1} title={'Player '+(i+1)+' Gender'} index={i}/>  
                                    </div>
                                ))}
                            </div>
                        )
                    }
                })()} 

                {/* Number of games? */}
                <TextField 
                    style={{margin: '10px'}}
                    id="number-of-games"
                    name="numGames"
                    label="Number of Games - (no more then 25)"
                    fullWidth
                    type="number"
                    onChange={(e) => updateGamesNumber(e)}
                    value={adData.numberOfGames}
                />
                {(() => {
                    if(adData.numberOfGames < 2) {
                        return (
                            <Box borderRadius="borderRadius" border={1} >
                                <InputLabel>Game details</InputLabel>
                                {/* button for location finder */}
                                <Button style={{maxWidth: '33%', margin: '2px', height: '55px'}} onClick={(e) => setLocationFinderVis(0)} variant="contained" color="secondary">Set Game Location</Button>
                                
                                {/* Game lat show */}
                                <TextField 
                                    disabled
                                    style={{margin: '2px', maxWidth: '30%'}}
                                    id="game-latitude"
                                    name="gameLatitude"  
                                    label="Game Latitude" 
                                    halfWidth
                                    variant="filled"
                                    value={adData.gamesLocation.lat[0]}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                {/* Game lng show */}
                                <TextField 
                                    disabled
                                    style={{margin: '2px', maxWidth: '30%'}}
                                    id="game-longitude"
                                    name="gameLongitude"  
                                    label="Game Longitude" 
                                    halfWidth
                                    variant="filled"
                                    value={adData.gamesLocation.lng[0]}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                
                                {/* Game state date time */}  
                                <TextField
                                    style={{margin: '10px'}}
                                    id="datetime-picker"
                                    label="Games Start time"
                                    type="datetime-local"
                                    format="dd/MM/yyyy"
                                    defaultValue={new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()}
                                    onChange={(e) => updateDateTime(e)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />   
                            </Box>
                        )
                    } else { 
                        let array = []
                        for(var i = 0; i < adData.numberOfGames ; i++) {
                            array.push(i)
                        }
                        return (
                            <div>
                                <div>
                                    {array.map((i)=>(
                                        <div key={'datetime'+i}>
                                            {/* Game state date time */}  
                                            <TextField
                                                style={{margin: '10px'}}
                                                id="datetime-picker"
                                                label={'Games '+(i+1)+' Start time'}
                                                type="datetime-local"
                                                format="dd/MM/yyyy"
                                                defaultValue={new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()}
                                                onChange={(e) => updateDateTime(e,i)}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                            />   
                                        </div>
                                    ))}
                                    </div>
                                <div>
                                    {/* same location? */}
                                    <FormControlLabel
                                        style={{width: '100%'}}
                                        control={<Checkbox 
                                            checked={searchComps.sameLocation} 
                                            onChange={sameLocationChange} 
                                            name="sameLocation" />
                                        }
                                        label="Are all games at the same Location?"
                                    />
                                </div>
                            </div>
                        )
                    }
                })()} 
                {(() => {
                    if(searchComps.sameLocation === true && adData.numberOfGames > 1) {
                        return (
                            <div>
                                {/* button for location finder */}
                                <Button style={{maxWidth: '33%', margin: '2px', height: '55px'}} onClick={(e) => setLocationFinderVis(0)} variant="contained" color="secondary">Set Games Locations</Button>
                                
                                {/* Game lat show */}
                                <TextField 
                                    disabled
                                    style={{margin: '2px', maxWidth: '30%'}}
                                    id="game-latitude"
                                    name="gameLatitude"  
                                    label="Game Latitude" 
                                    halfWidth
                                    variant="filled"
                                    value={adData.gamesLocation.lat[0]}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                {/* Game lng show */}
                                <TextField 
                                    disabled
                                    style={{margin: '2px', maxWidth: '30%'}}
                                    id="game-longitude"
                                    name="gameLongitude"  
                                    label="Game Longitude" 
                                    halfWidth
                                    variant="filled"
                                    value={adData.gamesLocation.lng[0]}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        )  
                    }
                    if (searchComps.sameLocation === false && adData.numberOfGames > 1) {
                        let array = []
                        for(var i = 0; i < adData.numberOfGames ; i++) {
                            array.push(i)
                        }
                        return (
                            <div>
                                {array.map((i)=>(
                                    <div key={'location'+i}>
                                        {/* button for location finder */}
                                        <Button style={{maxWidth: '33%', margin: '2px', height: '55px'}} onClick={(e) => setLocationFinderVis(i)} variant="contained" color="secondary">Set Game {i+1} Location</Button>
                                        
                                        {/* Game lat show */}
                                        <TextField 
                                            disabled
                                            style={{margin: '2px', maxWidth: '30%'}}
                                            id="game-latitude"
                                            name="gameLatitude"  
                                            halfWidth
                                            variant="filled"
                                            value={adData.gamesLocation.lat[i]}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        {/* Game lng show */}
                                        <TextField 
                                            disabled
                                            style={{margin: '2px', maxWidth: '30%'}}
                                            id="game-longitude"
                                            name="gameLongitude"  
                                            halfWidth
                                            variant="filled"
                                            value={adData.gamesLocation.lng[i]}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                    }
                })()}                
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                <LocationFinder trigger={searchComps.locationFinderVis} lat={-33.8688} lng={151.2093} setLocation={locationBack} index={searchComps.locationIndex}/>
                
            </form>
        </Paper>
    )
}

export default Form