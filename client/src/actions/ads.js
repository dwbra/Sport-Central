import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_AD } from '../constants/actionTypes';
import * as api from '../api/index.js'

// Action Creators
export const getAds = () => async (dispatch) => {
    try {
        const {data} = await api.getAds()

        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getAd = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchAd(id)

        dispatch({ type: FETCH_AD, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const createAd = (ad) => async (dispatch) => {
    try {
        const {data} = await api.createAd(ad)
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updateAd = (id, ad) => async (dispatch) => {
    try {
        const {data} = await api.updateAd(id, ad)

        dispatch({type: UPDATE, paylod: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteAd = (id) => async (dispatch) => {
    try {
        if (window.confirm('Are you sure?')) {
            await api.deleteAd(id)

            dispatch({type: DELETE, payload: id})
        }
    } catch (error) {
        console.log(error)
    }
}
