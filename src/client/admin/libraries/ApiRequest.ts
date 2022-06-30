import axios from 'axios';
import { logout } from '../store/authenticate/actions';
import { adminApiURL } from './../../resources/strings/apiURL';
import { store } from './../index';

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      store.dispatch(logout());
    }

    return Promise.resolve(response);
  },
  (error) => {
    if (error.response) {
      return Promise.resolve(error.response);
    }

    return Promise.reject(error.message);
  },
);

class ApiRequest {
  headers: { Authorization: string; 'Content-type'?: string };
  constructor() {
    this.headers = {
      Authorization: 'Bearer ' + localStorage.getItem('admin:accessToken'),
      'Content-type': 'multipart/form-data; boundary=' + Date.now(),
    };
  }

  post = (url: string, body: object) => axiosInstance.post(adminApiURL + url, body, { headers: this.headers });

  put = (url: string, body: object) => axiosInstance.put(adminApiURL + url, body, { headers: this.headers });

  get = (url: string, params?: object) => axiosInstance.get(adminApiURL + url, { headers: this.headers, params });

  delete = (url: string, id = '') => axiosInstance.delete(adminApiURL + url + id, { headers: this.headers });
}

export default ApiRequest;
