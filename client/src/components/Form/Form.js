import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper, Checkbox, Box, FormControlLabel, InputLabel} from '@material-ui/core'
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
        sportError: false,
        teamNameError: false,
        clubNameError: false,
        leagueNameError: false,
        gameDateTimeError: false,
        gameLocationError: false,
        adCreated: false,
        errorMessage: '',
    });

    const [adData, setAdData] = useState({
        teamName: '',
        filled: [false],
        sport: '',
        compOrCasual: "Casual",
        numberOfGames: 1,
        clubName: '',
        leagueName: '',
        skillLevel: "Casual",
        teamGender: "Mixed",
        gameLength: 90,
        gamesLocationLat: [0],
        gamesLocationLng: [0],
        gamesDateTime: [0],
        playerGenders: ["Male"],
    })

    const user = JSON.parse(localStorage.getItem('profile'))
    const ad = useSelector((state) => currentId ? state.ads.ads.find((a) => a._id === currentId) : null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(ad) setAdData(ad)
    }, [ad])


    // on submit or clear.. clear all the data
    const clear = () => {
        setCurrentId(null)
        setAdData({
            teamName: '',
            filled: [false],
            sport: '',
            compOrCasual: "Casual",
            numberOfGames: 1,
            clubName: '',
            leagueName: '',
            skillLevel: "Casual",
            teamGender: "Mixed",
            gameLength: 90,
            gamesLocationLat: [0],
            gamesLocationLng: [0],
            gamesDateTime: [0],
            playerGenders: ["Male"],
        })
        setsearchComps({
            locationFinderVis: false,
            numberOfPlayersNeeded: 1,
            sameLocation: true,
            locationIndex: 0,
            adCreated: false,
            errorMessage: '',
        })
    }

    // this displays the map popup and sets the picked location index
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

    // this gets the sport type info back from the sports drop down
    function sportBack(sport) {
        setAdData({...adData, 
            sport: sport,
        })
        setsearchComps({...searchComps, 
            sportError: false,
        })
    }

    // this gets the location info back and sets the lat and lng to the correct index in the ad data "gamesLocation"
    function locationBack(lat,lng,index) {
        //console.log("game index ", index) 
        setLocationFinderVis(0)
        if (index === 0) {
            setAdData({...adData, 
                gamesLocationLat: [lat],
                gamesLocationLng: [lng],
            })
        } else {
            const currentLat = adData.gamesLocationLat
            const currentLng = adData.gamesLocationLng
            //console.log(current.lat)    
            currentLat.splice(index, 1, lat)
            currentLng.splice(index, 1, lng)
            setAdData({...adData, 
                gamesLocationLat: currentLat,
                gamesLocationLng: currentLng,
            })  
        }
    }

    // this gets the player gender info back and sets it to the correct index in the ad data "playerGenders"
    function playerGenderBack(gender,index) {  
        if (index === 0) {
            setAdData({...adData, 
                playerGenders: [gender],
            })
        } else {
            const current = adData.playerGenders        
            current.splice(index, 1, gender)
            setsearchComps({...searchComps, 
                playerGenders: current,
            })  
        }
    }

    // this is the submit handler. and dispatches the data to create the ad. then the form is clear  the player gender info back and sets it to the correct index in the ad data "playerGenders"
    // 
    const handleSubmit = async (e) => {
        e.preventDefault()

        let pass = true
        
        let sportError = false
        let teamNameError = false
        let clubNameError = false
        let leagueNameError = false
        let gameDateTimeError = false
        let gameLocationError = false

        //check sport 
        if (adData.sport === ''|| adData.sport === "All"){
            console.log("SPORT name error")
            pass = false
            sportError = true
        }

        if(adData.compOrCasual === "Competition"){
            // check club name
            if(adData.clubName === '') {
                console.log("clubName name error")
                pass = false
                clubNameError = true
            }
            // check league name 
            if(adData.leagueName === '') {
                console.log("leagueName name error")
                pass = false
                leagueNameError = true
            }
        }

        //check team name 
        if (adData.teamName === ''){
            console.log("TEAM name error")
            pass = false
            teamNameError = true
        }      

        // Check all game location are no 0
        if (adData.numberOfGames < 2){
            if (adData.gamesLocationLat[0] === 0){
                console.log("game Location error")
                pass = false
                gameLocationError = true
            }  
        } else {
            for(var i = 0; i < adData.gamesLocationLat.length ; i++) {
                if (adData.gamesLocationLat[i] === 0){
                    console.log("game Location error")
                    pass = false
                    gameLocationError = true
                }  
            }
        }

        // Check all game date times
        if (adData.numberOfGames < 2){
            if (adData.gamesDateTime[0] === 0){
                console.log("game Date Time error")
                pass = false
                gameDateTimeError = true
            }  
        } else {
            for(i = 0; i < adData.gamesLocationLat.length ; i++) {
                if (adData.gamesDateTime[i] === 0){
                    console.log("game Date Time error")
                    pass = false
                    gameDateTimeError = true
                }  
            }
        }
        
        if(pass === true){
            //all tests passed
            if(currentId) {
                dispatch(updateAd(currentId, {...adData, name: user?.result?.name, creatorEmail: user?.result?.email, creatorId: user?.result?._id}))
            } else {
                dispatch(createAd({...adData, name: user?.result?.name, creatorEmail: user?.result?.email, creatorId: user?.result?._id}))
            }
            setsearchComps({...searchComps, 
                adCreated: true,
            })
        } else {
            //cerate test failed
            let string = ""
            if(sportError){
                string = string.concat(" Sport Selector Error!!")
            }
            if(teamNameError){
                string = string.concat(" Team Name Error!!")
            }
            if(clubNameError){
                string = string.concat(" Club Name Error!! ")
            }
            if(leagueNameError){
                string = string.concat(" League Name Error!!")
            }
            if(gameDateTimeError){
                string = string.concat(" Game Date Time Error!!")
            }
            if(gameLocationError){
                string = string.concat(" Game Location Error!!")
            }

            console.log("error ", string)
            setsearchComps({...searchComps, 
                errorMessage: string,
            })
        }
    }

    // this gets the competition or casual slider back and sets it to adData "compOrCasual"
    function compOrCasualBack(compOrCasual) {
        setAdData({...adData, 
            compOrCasual: compOrCasual,
        })
    }

    // this gets the number of games back 
    // then updates the gamesLocation and gamesDateTime arrays to make sure they are the correct length
    // then updates gamesDateTime, gamesLocation and numberOfGames to adData.
    function updateGamesNumber(e) {
        const re = /^[0-9\b]+$/;
        if ((e.target.value === '' || re.test(e.target.value)) && e.target.value < 26 && e.target.value > 0) {
            let locationLat = adData.gamesLocationLat
            let locationLng = adData.gamesLocationLng
            let dateTime = adData.gamesDateTime
            if (dateTime.length < e.target.value ) {
                while (String(dateTime.length) !== e.target.value){
                    dateTime.push(0)
                    locationLat.push(0)
                    locationLng.push(0)
                }
            } 
            if (dateTime.length > e.target.value ) {
                while (String(dateTime.length) !== e.target.value ){
                    dateTime.splice(dateTime.length-1, 1)
                    locationLat.splice(dateTime.length-1, 1)
                    locationLng.splice(dateTime.length-1, 1)
                }
            }
            setAdData({...adData, 
               gamesDateTime: dateTime,
               gamesLocationLat: locationLat,
               gamesLocationLng: locationLng,
               numberOfGames: e.target.value,
            }) 
        }
    }
    
    // this gets the number of players back 
    // then updates the playerGenders and filled arrays to make sure they is the correct length
    // then updates playerGenders and filled to adData .
    // and updates numberOfPlayersNeeded to searchComps.
    function updateNumberOfPlayersNeeded(e) {
        const re = /^[0-9\b]+$/;
        if ((e.target.value === '' || re.test(e.target.value)) && e.target.value < 11 && e.target.value > 0) {
            let currentPlayerG = adData.playerGenders
            let currentFilled = adData.filled

            if (currentPlayerG.length < e.target.value ) {
                while (String(currentPlayerG.length) !== e.target.value){
                    currentPlayerG.push("Male")
                    currentFilled.push(false)

                }
            } 
            if (currentPlayerG.length > e.target.value ) {
                while (String(currentPlayerG.length) !== e.target.value ){
                    currentPlayerG.splice(currentPlayerG.length-1, 1)
                    currentFilled.splice(currentFilled.length-1, 1)
                }
            }
            setsearchComps({...searchComps, 
                numberOfPlayersNeeded: e.target.value,
            })
            setAdData({...adData, 
               playerGenders: currentPlayerG,
               filled: currentFilled,
            }) 
        }
    }

    // this gets the game length back and makes sure it is a number.
    // then updates the  gameLength in adData
    function updategameLength(e) {
        const re = /^[0-9\b]+$/;
        if ((e.target.value === '' || re.test(e.target.value)) && e.target.value > 0) {
            setAdData({...adData, 
                gameLength: e.target.value,
            })
        }
    }

    // this gets the info back from the Are games at the same location checkbox.
    // then updates the  sameLocation in searchComps
    function sameLocationChange(event) {
        setsearchComps({...searchComps, 
            sameLocation: event.target.checked,
        })
    }

    // this gets the teams gender slider info back.
    // then updates the teamGender in adData
    function teamGenderBack(gender) {
        setAdData({...adData, 
            teamGender: gender,
        })
    }

    // this gets the skill Level slider info back.
    // then updates the skillLevel in adData
    function skillLevelBack(skill) {
        setAdData({...adData, 
            skillLevel: skill,
        })
    }

    // this gets the time and game index back date time picker.
    // then updates it to the correct index of the gamesDateTime array in adData.
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


    // message if user is not signed in.   
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

    if(searchComps.adCreated === false) {
        return (
            <Paper style={{width: '90%'}}>
                <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{width: '90%', margin: 'auto'}}>

                    {/* top message */}
                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} An Add</Typography>

                    {/* error */}
                    <Typography color={'error'} variant="h6">{searchComps.errorMessage}</Typography>
                    <br/>
                    {/* sport? */}
                    <SportsList setSport={sportBack} passError={searchComps.sportError} />

                    {/* Casual or comp ? */}
                    <MultiSlider setAsking={compOrCasualBack} valuesArray={["Casual", "Competition"]} defaultValue={0} title={"Game Types"}/>
                    
                    {/* Mixed ? */}
                    <MultiSlider setAsking={teamGenderBack} valuesArray={["All Female", "Mixed", "All Male"]} defaultValue={1} title={"Team Gender"}/>
                    
                    {/* if Competition then show clubName and leagueName text boxes */}
                    {(() => {
                        if (adData.compOrCasual === "Competition") {
                            return (
                                <div>
                                    {/* clubName or comp ? */}
                                    <TextField 
                                        error={searchComps.clubNameError}
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
                                        error={searchComps.leagueNameError}
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
                        error={searchComps.teamNameError}
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
                    <MultiSlider setAsking={skillLevelBack} valuesArray={["Noob", "Casual", "Amateur", "Quite Good", "Pro"]} defaultValue={1} title={"Skill Level"}/>

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

                    {/* if Number of games is 1 */}
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
                                        value={adData.gamesLocationLat[0]}
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
                                        value={adData.gamesLocationLng[0]}
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
                        
                        //* if Number of games more then 1 *
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

                    {/* if Number of games is more then 1 and they are at the same location */}
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
                                        value={adData.gamesLocationLat[0]}
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
                                        value={adData.gamesLocationLng[0]}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                            )  
                        }
                        //* if Number of games is more then 1 and they are NOT at the same location */}
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
                                                value={adData.gamesLocationLat[i]}
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
                                                value={adData.gamesLocationLng[i]}
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
                    
                    {/* submit button  */}
                    <Button variant="contained" color="primary" size="large" type="submit" fullWidth> Submit </Button>
                    {/* clear button  */}
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                    {/* location popup */}
                    <LocationFinder trigger={searchComps.locationFinderVis} lat={-33.8688} lng={151.2093} setLocation={locationBack} index={searchComps.locationIndex}/>


                </form>
            </Paper>
        )
    } else {
        return (
            <div style={{marginTop: '30px',marginLeft: '25%', maxWidth: '50%'}}>
                <Typography variant="h6">{currentId ? 'Editid' : 'Created'} Ad</Typography>
                <Button variant="contained" color="primary" size="large" onClick={clear} fullWidth>OK</Button>
            </div>
        )
    }
}

export default Form