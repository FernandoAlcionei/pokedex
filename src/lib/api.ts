import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access-token');

    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (config) => {
    const authorization = config.headers['Authorization'];

    if (authorization) {
      localStorage.setItem('access-token', authorization);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
