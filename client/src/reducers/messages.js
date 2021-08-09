import { FETCH_ALL_MESSAGES, FETCH_MESSAGE} from '../constants/actionTypes.js';

const initialState = { messages:[] }

// Reducer functions where the state is the initial state, and the actions determine the course of action
// The spreadh operator is used in the actions to get the current state in the app, with the payload being the data retrieved through the API actions
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_MESSAGES: 
            return {...state, messages: action.payload }
        case FETCH_MESSAGE:
            return { ...state, message: action.payload }
        default: 
            return state
    }
}