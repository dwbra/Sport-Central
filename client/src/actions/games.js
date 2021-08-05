import { CREATE, FETCH_ALL, FETCH_GAME } from '../constants/actionTypes';
import * as api from '../api/index.js'

// Action Creators

// Andrew's code for creating games
export const createGame = (ad, game) => async (dispatch) => {
    try {
        const {data} = await api.createGame(game)
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getGames = () => async (dispatch) => {
    try {
        const {data} = await api.getGames()

        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getGame = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchGame(id)

        dispatch({ type: FETCH_GAME, payload: data })
    } catch (error) {
        console.log(error)
    }
}