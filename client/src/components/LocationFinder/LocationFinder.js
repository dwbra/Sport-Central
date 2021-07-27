import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

function LocationFinder(props) {

    const [coordinates, setCoordinates] = useState({
        selected_lat: 0,
        selected_lng: 0,
        button: 'hidden',
    });

    let defaultProps = {
        center: {
        lat: props.lat,  //syd -33.8688
        lng: props.lng // syd 151.2093
        },
        zoom: 11
    };

    function setpin(e) {
        setCoordinates(coordinates => ({
        selected_lat: e.lat,
        selected_lng: e.lng,
        button: 'visible'
        }))
    }

    function select() {
        setCoordinates(coordinates => ({
        ...coordinates,
        button: 'hidden'
        }))
        props.setLocation(coordinates.selected_lat,coordinates.selected_lng)
    }

    return (
        <div>
            <div style={{ position: 'absolute', height: '70%', width: '70%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDU_VebItheUUVLrkNeCLbzFduLFUAG0eU' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    onClick={(e) => setpin(e)}
                >
                    <Marker
                    lat={coordinates.selected_lat}
                    lng={coordinates.selected_lng}
                    name="My Marker"
                    color="blue"
                    />
                </GoogleMapReact>
            </div>
            <div style={{position: 'absolute', left: '50%', visibility: coordinates.button }}>
                <button onClick={() => select()}  style={{ width: '100%', height: '20px'}}>Select location</button>
            </div>   
        </div>
    );
}

export default LocationFinder;
