import {CREATE, FETCH_ALL_MESSAGES, FETCH_MESSAGE} from '../constants/actionTypes';
import * as api from '../api/index.js'

// Action Creators
export const createMessage = (message) => async (dispatch) => {
    try {
        const {data} = await api.createMessage(message)
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getMessages = () => async (dispatch) => {
    try {
        const {data} = await api.getMessages()

        dispatch({ type: FETCH_ALL_MESSAGES, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getMessage = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchMessage(id)

        dispatch({ type: FETCH_MESSAGE, payload: data })
    } catch (error) {
        console.log(error)
    }
}