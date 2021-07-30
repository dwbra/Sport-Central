import { FETCH_ALL, FETCH_AD, CREATE, UPDATE, DELETE} from '../constants/actionTypes.js';

const initialState = { ads:[] }

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