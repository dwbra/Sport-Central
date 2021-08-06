import {AUTH, LOGOUT} from '../constants/actionTypes';

// Initially sets the state where the authentication data is null
// on the AUTH action type, sets the data to be local storage along with the profile data of logging in
// It will then return the current state along with the profile data
// On the LOGOUT action type, it will clear the local storage and set the state back to null
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;