import { FETCH_ALL_GAMES, FETCH_GAME} from '../constants/actionTypes.js';

const initialState = { games:[] }

// Reducer functions where the state is the initial state, and the actions determine the course of action
// The spreadh operator is used in the actions to get the current state in the app, with the payload being the data retrieved through the API actions
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_GAMES: 
            return {...state, games: action.payload }
        case FETCH_GAME:
            return { ...state, game: action.payload }
        default: 
            return state
    }
}