import React, { useState } from 'react';
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'


const SportsList = ({setSport, passError}) => {

    const sportsList = [
        "All",
		"AFL",
		"Badminton",
		"Basketball",
		"Cricket",
		"Football (Soccer)",
		"Futsal",
		"Golf",
		"Oztag",
		"Rugby League",
		"Rugby Union",
		"Tennis",
		"Ultimate Frisbee"
		]

    const [sport, setSportState] = useState("All")

    function MakeMenuItem(x) {
        return <MenuItem value={x}>{x}</MenuItem>;
    }

    let handleChange = (event) => {
        setSportState(event.target.value)
        setSport(event.target.value)
    }

    return (
        <FormControl error={passError} style={{marginBottom: '5px', minWidth: 220}} >
            <InputLabel id="Sport">Select A Sport</InputLabel>
            <Select id="sport-select" value={sport} labelId="Sport" onChange={handleChange}>
                {sportsList.map(MakeMenuItem)}
            </Select>
        </FormControl>
    )
}

export default SportsList
