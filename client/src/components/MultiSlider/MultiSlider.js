import React from 'react';
import {Slider, Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '5px solid currentColor',
        marginTop: -12,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 20,
        borderRadius: 10,
        marginTop: -10,
    },
})(Slider);

let Value = ""

const MultiSlider = ({setAsking, valuesArray, defaultValue ,title, index}) => {
 
    const marks = valuesArray.map((e, i) => ({ value: i, label: e}))

    function valueLabelFormat(value) {
        const [coefficient, exponent] = value
            .toExponential()
            .split('e')
            .map((item) => Number(item));
        return `${Math.round(coefficient)}e^${exponent}`;
    }

    let handleChange = (event, newValue) => {
        if(Value !== newValue) {
            Value = newValue
            setAsking(valuesArray[newValue], index)
            //console.log(valuesArray[newValue])
        }
    }

    return (
        <div >
            <Typography id="discrete-slider-custom" gutterBottom>
                {title}
            </Typography>
            <PrettoSlider
                style={{height: 8,}}
                track={false}
                defaultValue={defaultValue}
                getAriaValueText={valueLabelFormat}
                aria-labelledby="discrete-slider"
                step={1}
                marks={marks}
                min={0}
                max={valuesArray.length -1}
                ValueLabelComponent="auto"
                onChange={handleChange}
            />
        </div>
    )

};

export default MultiSlider;