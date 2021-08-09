// Index file for all reducers to be used in the API and action creators.
import { combineReducers } from "redux";
import ads from './ads.js'
import auth from './auth.js'
import games from './games.js'
import messages from './messages.js'

export default combineReducers({ ads, auth, games, messages })