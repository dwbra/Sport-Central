import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getAds = () => API.get('/ads');
export const createAd = (newAd) => API.post('/ads', newAd); 
export const updateAd = (id, updatedAd) => API.patch(`/ads/${id}`, updatedAd);
export const deleteAd = (id) => API.delete(`/ads/${id}`);

export const getUsers = () => API.get('/users');
export const createUser = (newUser) => API.post('/users', newUser); 
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const getMessages = () => API.get('/messages');
export const createMessage = (newMessage) => API.post('/messages', newMessage); 
export const updateMessage = (id, updatedMessage) => API.patch(`/messages/${id}`, updatedMessage);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

export const getGames = () => API.get('/games');
export const createGame = (newMessage) => API.post('/games', newMessage); 
export const updateGame = (id, updatedMessage) => API.patch(`/games/${id}`, updatedMessage);
export const deleteGame = (id) => API.delete(`/games/${id}`);

export const getSports = () => API.get('/sports');