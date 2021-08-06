import { combineReducers } from "redux";
import ads from './ads.js'
import auth from './auth.js'
import games from './games.js'

export default combineReducers({ ads, auth, games })