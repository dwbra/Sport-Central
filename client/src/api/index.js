import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getAds = () => API.get('/ads');
export const createAd = (newAd) => API.post('/ads', newAd); 
export const updateAd = (id, updatedAd) => API.patch(`/ads/${id}`, updatedAd);
export const deleteAd = (id) => API.delete(`/ads/${id}`);