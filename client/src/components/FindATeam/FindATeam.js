import React, { useState, useEffect } from 'react';
import {Button, Toolbar,TextField} from '@material-ui/core'
import {useDispatch } from 'react-redux'
import { getAds } from '../../actions/ads.js'
import LocationFinder from '../LocationFinder/LocationFinder'
import SportsList from '../SportsList/SportsList'
import Ads from '../Ads/Ads.js'
import MultiSlider from '../MultiSlider/MultiSlider'


const FindATeam = () => {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAds())
    }, [currentId, dispatch])


    const [searchComps, setsearchComps] = useState({
        locationFinderVis: false,
        adsVis: false,
    });

    const [searchFilters, setsearchFilters] = useState({
        lat: 0,
        lng: 0,
        distance: 100,
        sport: "All",
        gender: "All",
        compOrCasual: "All",
        skillLevel: "All",
    });

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

    function compOrCasualBack(compOrCasual) {
        setsearchFilters(searchFilters => ({
            ...searchFilters,
            compOrCasual: compOrCasual,
        })) 
    }

    function teamGenderBack(gender) {
        setsearchFilters(searchFilters => ({
            ...searchFilters,
            gender: gender,
        })) 
    }

    function skillLevelBack(skillLevel) {
        setsearchFilters(searchFilters => ({
            ...searchFilters,
            skillLevel: skillLevel,
        })) 
    }

    function locationBack(lat,lng) {
        setLocationFinderVis()
        setsearchFilters(searchFilters => ({
            ...searchFilters,
            lat: lat,
            lng: lng,
        })) 
        setsearchComps(searchComps => ({
            ...searchComps,
            adsVis: true
        })) 
    }

    function sportBack(sport) {
        setsearchFilters(searchFilters => ({
            ...searchFilters,
            sport: sport
        })) 
    }


    function updateDistance(e) {
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
            setsearchFilters(searchFilters => ({
            ...searchFilters,
            distance: e.target.value,
        })) 
      }
    }


    return (
        <div style={{maxWidth: '70%', margin: 'auto'}}>
            <SportsList setSport={sportBack}/>
            {/* Casual or comp ? */}
            <MultiSlider setAsking={compOrCasualBack} valuesArray={["All", "Casual", "Competition"]} defaultValue={0} title={"Game Types"}/>
            
            {/* Mixed ? */}
            <MultiSlider setAsking={teamGenderBack} valuesArray={["All", "Mixed", "All Female", "All Male"]} defaultValue={0} title={"Team Gender"}/>

            {/* Skill Level ? */}
            <MultiSlider setAsking={skillLevelBack} valuesArray={["All", "Noob", "Casual", "Amateur", "Quite Good", "Pro"]} defaultValue={0} title={"Skill Level"}/>

            <Toolbar>

                <Button onClick={setLocationFinderVis} variant="contained" color="secondary">Set Search Location</Button>
                <TextField 
                    style={{margin: '20px'}}
                    id="Search-Distance" 
                    label="Search Distance in km" 
                    onChange={(e) => updateDistance(e)}
                    value={searchFilters.distance}
                    />
            </Toolbar>
            


            <LocationFinder trigger={searchComps.locationFinderVis} lat={-33.8688} lng={151.2093} setLocation={locationBack} />

            {(() => {
                if (searchComps.adsVis === true) {
                    return (
                        <Ads 
                            setCurrentId={setCurrentId} 
                            lat={searchFilters.lat} 
                            lng={searchFilters.lng} 
                            gender={searchFilters.gender}
                            compOrCasual={searchFilters.compOrCasual}
                            skillLevel={searchFilters.skillLevel}
                            distance={searchFilters.distance} 
                            sport={searchFilters.sport}
                        />
                    )
                }
            })()}
        </div>
    );
};

export default FindATeam;