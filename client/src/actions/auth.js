import * as api from '../api'
import {AUTH} from '../constants/actionTypes.js'

// Sign in action where formdata and history are variables
// data is destructured to be the API post request to the server
// Dispatch the action type to be AUTH along with the data
// History is used to push the client to the /home route once the user has been signed in
export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)

        dispatch({type: AUTH, data})

        history.push('/home')
    } catch (error) {
        console.log(error)
            if (error.message === 'Request failed with status code 400'){
           alert("Invalid credentials")
        }
        if (error.message === 'Request failed with status code 404'){
           alert("User doesn't exist.")
        }
    }
}

// Sign up action where formdata and history are variables
// data is destructured to be the API post request to the server to create a new user
// Dispatch the action type to be AUTH along with the data
// History is used to push the client to the /home route once the user has been signed up and subsequently signed in
export const signup = (formData, history) => async (dispatch) => {
    try {

        const { data } = await api.signUp(formData)

        dispatch({type: AUTH, data})

        history.push('/home')
    } catch (error) {
        if (error.message === 'Request failed with status code 403'){
           alert('User already exists')
        }
        if (error.message === 'Request failed with status code 404'){
           alert("Passwords don't match.")
        }
    }
}