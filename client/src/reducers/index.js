import { combineReducers } from "redux";
import ads from './ads.js'
import auth from './auth.js'

export default combineReducers({ ads, auth })