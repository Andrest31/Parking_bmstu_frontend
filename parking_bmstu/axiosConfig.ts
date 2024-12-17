import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Укажите ваш базовый URL
});

export default axiosInstance;
