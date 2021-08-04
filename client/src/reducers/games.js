import { FETCH_ALL, FETCH_GAME} from '../constants/actionTypes.js';

const initialState = { games:[] }

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL: 
            return {...state, games: action.payload }
        case FETCH_GAME:
            return { ...state, game: action.payload }
        default: 
            return state
    }
}