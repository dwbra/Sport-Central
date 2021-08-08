import { CREATE, FETCH_ALL_GAMES, FETCH_GAME } from '../constants/actionTypes';
import * as api from '../api/index.js'

// Action Creators

// Andrew's code for creating games
export const createGame = (ad, game) => async (dispatch) => {
    try {

        const {data} = await api.createGame(ad)
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

// Action to get all games through the API function
// The data retrieved is set as the payload to be used in the reducer function
export const getGames = () => async (dispatch) => {
    try {
        const {data} = await api.getGames()

        dispatch({ type: FETCH_ALL_GAMES, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// Action to get a specific game with ID passed as a variable
// The data retrieved is set as the payload to be used in the reducer function
export const getGame = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchGame(id)

        dispatch({ type: FETCH_GAME, payload: data })
    } catch (error) {
        console.log(error)
    }
}