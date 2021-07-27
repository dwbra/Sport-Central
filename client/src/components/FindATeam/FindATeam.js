import React, { useState, useEffect } from 'react';
import {Button, Toolbar,TextField} from '@material-ui/core'
import {useDispatch } from 'react-redux'
import { getAds } from '../../actions/ads.js'
import LocationFinder from '../LocationFinder/LocationFinder'
import distanceCalc from '../LocationFinder/distanceCalc';
import Ads from '../Ads/Ads.js'


const FindATeam = () => {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAds())
    }, [currentId, dispatch])


    const [searchComps, setsearchComps] = useState({
        locationFinderVis: 'hidden',
        adsVis: 'hidden',
    });

    const [searchFilters, setsearchFilters] = useState({
        lat: 0,
        lng: 0,
    });

    function setLocationFinderVis() {
        if (searchComps.locationFinderVis === 'hidden') {
            setsearchComps(searchComps => ({
                ...searchComps,
                locationFinderVis: 'visible'
            }))
        } else {
            setsearchComps(searchComps => ({
                ...searchComps,
                locationFinderVis: 'hidden'
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
            adsVis: 'visible'
        })) 
    }

    return (
        <div>
            <Toolbar>
                <Button onClick={setLocationFinderVis} variant="contained" color="secondary">Set Search Location</Button>
                <TextField id="Search-Distance" label="Search Distance in km"/>
            </Toolbar>
            <div style={{ visibility: searchComps.locationFinderVis}}>
                <LocationFinder lat={-33.8688} lng={151.2093} setLocation={locationBack}/>
            </div>
            <div style={{ visibility: searchComps.adsVis}}>
                <Ads setCurrentId={setCurrentId} />
            </div>
        </div>
    );
};

export default FindATeam;