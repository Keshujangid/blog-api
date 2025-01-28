import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blog-api-tau-gilt.vercel.app', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401) {
//       // Token expired or unauthorized
//       localStorage.removeItem('token'); // Or clear cookie
//       window.location.href = '/login'; // Redirect to login
//     }
//     return Promise.reject(error);
//   }
// );


export default api;
