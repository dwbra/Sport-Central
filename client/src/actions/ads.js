import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_AD } from '../constants/actionTypes';
import * as api from '../api/index.js'

// Action Creators
// Action to assign data as the destructured object through the API request to get all ads
// Action type is to fetch all ads, and the payload is the data that was retrived from the API request
export const getAds = () => async (dispatch) => {
    try {
        const {data} = await api.getAds()

        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// Action to assign data as the destructured object through the API request to get the ad with the specific ID
// Action type is to fetch that specific ad, and the payload is the data that was retrived from the API request
export const getAd = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchAd(id)

        dispatch({ type: FETCH_AD, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// Action to use the data creased in the ad form and do a post request to the server through the CREATE action type
export const createAd = (ad) => async (dispatch) => {
    try {
        const {data} = await api.createAd(ad)
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

// Action to update the ad with a specific ID, and retrieve the ad data for that specific ad
export const updateAd = (id, ad) => async (dispatch) => {
    try {
        const {data} = await api.updateAd(id, ad)

        dispatch({type: UPDATE, paylod: data})
    } catch (error) {
        console.log(error)
    }
}

// Action to delete the ad with a specific ID
// Payload is ID in this instance to use as the identifier, as ad data itself won't need to be retrieved
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
