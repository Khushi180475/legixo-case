import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const role = localStorage.getItem('role') || 'Intern';
  config.headers['x-user-role'] = role;
  return config;
});

export default api;
