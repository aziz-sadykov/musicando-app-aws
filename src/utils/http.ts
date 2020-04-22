import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://service-musicando.herokuapp.com/v1/musicando/', //'http://192.168.0.107/v1/musicando/'
});

export default api;
