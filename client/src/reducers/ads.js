import { FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes.js';

export const reducer = (ads = [], action) => {
    switch (action.type) {
        case FETCH_ALL: 
            return action.payload
        case CREATE: 
            return [...ads, action.payload]
        case UPDATE: 
            return ads.map((ad) => (ad._id === action.payload._id ? action.payload : ad))
        case DELETE:
            return ads.filter((ad) => ad._id !== action.payload)
        default: 
            return ads
    }
}

export default reducer