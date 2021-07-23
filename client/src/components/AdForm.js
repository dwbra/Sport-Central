import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import {getAds, createAd, updateAd, deleteAd} from '../api/index.js'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const Ad = () => {
    const [teamName, setTeamName] = useState('')
    const [sport, setSport] = useState('')
    const [skillLevel, SetSkillLevel] = useState('')

    const add = async () => {
        try {
            await Axios.post('http://localhost:5000/ads', {
                teamName: teamName,
                sport: sport
            })
        } catch ({ message }) {
            console.log(`oops, something went wrong: ${message}`)
          } 
    }

    return(
        <>
        <Typography variant="h3" align="left">Create Ad</Typography> 
        <form onSubmit={add}>
        <TextField 
            onChange={(e) => {setTeamName(e.target.value)}}
            label="Team Name"
            value={teamName}
        />
        <InputLabel htmlFor="age-native-simple">Sport</InputLabel>
        <Select
          native
          value={sport}
          onChange={(e) => {setSport(e.target.value)}}
          inputProps={{
            name: 'sport',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'Basketball'}>Basketball</option>
          <option value={'Oztag'}>Oztag</option>
          <option value={'Netball'}>Netball</option>
        </Select>
        <Button
            variant="contained"
            type="submit"
        >
            Create Ad
        </Button>
        </form>
        </>
    )
}

export default Ad