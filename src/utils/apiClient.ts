import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-backend-url.com', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
