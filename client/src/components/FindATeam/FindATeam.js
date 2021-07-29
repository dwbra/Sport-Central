import React, { useState, useEffect } from 'react';
import {Button, Toolbar,TextField} from '@material-ui/core'
import {useDispatch } from 'react-redux'
import { getAds } from '../../actions/ads.js'
import LocationFinder from '../LocationFinder/LocationFinder'
import SportsList from '../SportsList/SportsList'
import Ads from '../Ads/Ads.js'


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
        <div>
            <SportsList setSport={sportBack}/>
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

            <LocationFinder trigger={searchComps.locationFinderVis} lat={-33.8688} lng={151.2093} setLocation={locationBack}/>

            {(() => {
                if (searchComps.adsVis === true) {
                    return (
                        <Ads 
                            setCurrentId={setCurrentId} 
                            lat={searchFilters.lat} 
                            lng={searchFilters.lng} 
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