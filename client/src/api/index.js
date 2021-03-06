import axios from 'axios';

// For deployment
const API = axios.create({ baseURL: 'https://sport-central-project.herokuapp.com/' });

// For Local
// const API = axios.create({ baseURL: 'http://localhost:5000' });

// Allocating the Bearer token to be the token of the signed in user
// User token is stored in local storage to be accessed
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

// API requests for manipulating the data of the ads with the server
export const fetchAd = (id) => API.get(`/ads/${id}`)
export const getAds = () => API.get('/ads');
export const createAd = (newAd) => API.post('/ads', newAd); 
export const updateAd = (id, updatedAd) => API.patch(`/ads/${id}`, updatedAd);
export const deleteAd = (id) => API.delete(`/ads/${id}`);

// API post requests that posts the form data for the relevant checks in the user controller
export const applyForPosition = (updatedAd) => API.patch(`/adInteract`, updatedAd);
export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)

export const fetchMessage = (id) => API.get(`/messages/${id}`)
export const getMessages = () => API.get('/messages');
export const createMessage = (newMessage) => API.post('/messages', newMessage); 
export const updateMessage = (id, updatedMessage) => API.patch(`/messages/${id}`, updatedMessage);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

// API requests for manipulating games
export const fetchGame = (id) => API.get(`/games/${id}`)
export const getGames = () => API.get('/games');
export const createGame = (newMessage) => API.post('/games', newMessage); 
export const updateGame = (id, updatedMessage) => API.patch(`/games/${id}`, updatedMessage);
export const deleteGame = (id) => API.delete(`/games/${id}`);

export const getSports = () => API.get('/sports');