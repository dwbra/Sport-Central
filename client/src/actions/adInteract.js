import {UPDATE} from '../constants/actionTypes';
import * as api from '../api/index.js'

export const applyForPosition = (info) => async (dispatch) => {
    try {
        const {data} = await api.applyForPosition(info)

        dispatch({type: UPDATE, paylod: data})
    } catch (error) {
        console.log(error)
    }
}