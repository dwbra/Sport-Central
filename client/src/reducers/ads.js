import { FETCH_ALL, FETCH_AD, CREATE, UPDATE, DELETE} from '../constants/actionTypes.js';

// Setting the initial state of ads to be an object with an empty array
const initialState = { ads:[] }

// Reducer functions where the state is the initial state, and the actions determine the course of action
// The spreadh operator is used in the actions to get the current state in the app, with the payload being the data retrieved through the API actions
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL: 
            return {...state, ads: action.payload }
        case CREATE: 
            return { ...state, ads: [...state.ads, action.payload] }
        case UPDATE: 
            return { ...state, ads: state.ads.map((ad) => (ad._id === action.payload._id ? action.payload : ad)) }
        case DELETE:
            return { ...state, ads: state.ads.filter((ad) => ad._id !== action.payload) }
        case FETCH_AD:
            return { ...state, ad: action.payload }
        default: 
            return state
    }
}