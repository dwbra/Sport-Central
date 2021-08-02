import { CREATE } from '../constants/actionTypes';
import * as api from '../api/index.js'

// Action Creators

export const createGame = (ad) => async (dispatch) => {
    try {
        const {data} = await api.createGame(ad)
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}
