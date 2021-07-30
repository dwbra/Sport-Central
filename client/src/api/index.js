import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const getAds = () => API.get('/ads');
export const createAd = (newAd) => API.post('/ads', newAd); 
export const updateAd = (id, updatedAd) => API.patch(`/ads/${id}`, updatedAd);
export const deleteAd = (id) => API.delete(`/ads/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)

export const getMessages = () => API.get('/messages');
export const createMessage = (newMessage) => API.post('/messages', newMessage); 
export const updateMessage = (id, updatedMessage) => API.patch(`/messages/${id}`, updatedMessage);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

export const getGames = () => API.get('/games');
export const createGame = (newMessage) => API.post('/games', newMessage); 
export const updateGame = (id, updatedMessage) => API.patch(`/games/${id}`, updatedMessage);
export const deleteGame = (id) => API.delete(`/games/${id}`);

export const getSports = () => API.get('/sports');

export const getUserEmails = () => API.get('/user')