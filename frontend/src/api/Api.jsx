// src/api/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchFoodListings = () => API.get('/food');
export const donateFood = (foodData) => API.post('/food', foodData);
export const fetchPickups = () => API.get('/pickups');

export default API; // Add this line to export API as default
