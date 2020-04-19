import axios from 'axios';
import Cookies from 'js-cookie';
import { API_HOSTNAME } from '../constants/api';

const api = (endpoint = '', method = 'GET', data = null, params = null) => new Promise((resolve, reject) => {
  try {
    const headers = {};
    const token = Cookies.get('token') || null;
    axios.interceptors.request.use((request) => {
      // console.log('Starting Request', request);
      return request;
    });
    axios.interceptors.response.use((response) => {
      // console.log('Response:', response);
      return response;
    });
    if (token && token !== undefined) {
      headers.Authorization = token && `Bearer ${token}`;
    }
    return axios({
      url: API_HOSTNAME + endpoint,
      method,
      data,
      params,
      headers,
    })
      .then((response) => resolve(response.data))
      .catch((err) => resolve(err.response && err.response.data));
  } catch (e) {
    reject(e);
  }
});

export default api;
