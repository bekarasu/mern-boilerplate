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
  (error) => Promise.reject(error.response),
);

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('admin:accessToken');

    if (!accessToken) {
      store.dispatch(logout());
      return {
        ...config,
        cancelToken: new axios.CancelToken((cancel) => cancel('')),
      };
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        'Content-type': 'multipart/form-data; boundary=' + Date.now(),
        authorization: `Bearer ${accessToken}`,
      },
    };
  },
  (error) => Promise.reject(error),
);

class ApiRequest {
  post = (url: string, body: object) => axiosInstance.post(adminApiURL + url, body);

  put = (url: string, body: object) => axiosInstance.put(adminApiURL + url, body);

  get = (url: string, params?: object) => axiosInstance.get(adminApiURL + url, { params });

  delete = (url: string, id = '') => axiosInstance.delete(adminApiURL + url + id);
}

export default ApiRequest;
