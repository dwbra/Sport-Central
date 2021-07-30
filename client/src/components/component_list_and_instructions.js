
// MultiSlider

//To call
<div style={{maxWidth: '50%', margin: 'auto'}}>
    <MultiSlider setAsking={teamGenderBack} valuesArray={["All Female", "Mixed", "All Male"]} defaultValue={1} title={"Team Gender"}/>
</div>

// sending array of selections is "valuesArray"
// sending starting point in "defaultValue"
// Sending title in "title"
// parent div controls size a placement of anything a div can do.

// sending the get info back function in "setAsking"



// LocationFinder

// to call
<Button onClick={setLocationFinderVis} variant="contained" color="secondary">Set Game Location</Button>

// calls setLocationFinderVis() to set trigger in this case searchComps.locationFinderVis to true. can be done however you want.

//place LocationFinder at the bottom of the component list so that is appears on top. 
<LocationFinder trigger={searchComps.locationFinderVis} lat={-33.8688} lng={151.2093} setLocation={locationBack}/>

// Sending lat and Lng for the starting point of the maps location
// sending the get info back function in "setLocation"



// Sports list

// to call 
<SportsList setSport={sportBack}/>

// sending the get info back function in "setSport"
// SportsList component has sports list array in it.