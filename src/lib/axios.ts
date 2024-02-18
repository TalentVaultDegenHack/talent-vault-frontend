import axios from 'axios';

const API_URL = `http://145.239.84.63:3000`

export const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = token ? `Bearer ${token}` : undefined;
    }

    return config;
});