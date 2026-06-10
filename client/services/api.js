// C:\E-Yojna\client\services\api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For Render Production (LIVE)
const API_BASE_URL = 'https://e-yojna-api.onrender.com/api';

// For local development (uncomment when testing locally)
// const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
};

// Scheme APIs
export const schemesAPI = {
  getAll: () => api.get('/schemes'),
  search: (query) => api.get(`/schemes/search?q=${query}`),
  filter: (category) => api.get(`/schemes/filter?category=${category}`),
  fetchGovtSchemes: () => api.get('/schemes/fetch'),
};

// User APIs
export const userAPI = {
  addFavorite: (userId, schemeId) => api.post('/users/favorites', { userId, schemeId }),
  getFavorites: (userId) => api.get(`/users/favorites/${userId}`),
  addRecentView: (userId, schemeId) => api.post('/users/recent', { userId, schemeId }),
  getRecentViews: (userId) => api.get(`/users/recent/${userId}`),
};

export default api;