import axios, { AxiosResponse } from 'axios';
import { logout } from '../store/authenticate/actions';
import { adminApiURL } from './../../resources/strings/apiURL';
import { store } from './../index';

class ApiRequest {
  headers: { Authorization: string; 'Content-type'?: string };
  constructor() {
    this.headers = {
      Authorization: 'Bearer ' + localStorage.getItem('admin:accessToken'),
      'Content-type': 'multipart/form-data; boundary=' + Date.now(), // it is required for sending form to ExpressJS server
    };
  }

  /**
   *
   * @param url send request to this endpoint
   * @param body request body data
   */
  post(url: string, body: object): Promise<AxiosResponse<any>> {
    return new Promise((resolve) => {
      axios
        .post(adminApiURL + url, body, { headers: this.headers })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          // handling between of 400 to 500 codes
          if (res.response.status === 401) {
            store.dispatch(logout());
          }
          resolve(res.response);
        });
    });
  }

  /**
   *
   * @param url send request to this endpoint
   * @param body request body data
   */
  async put(url: string, body: object) {
    return await axios.put(adminApiURL + url, body, { headers: this.headers });
  }

  /**
   *
   * @param url send request to this endpoint
   * @param params request query params
   */
  get(url: string, params?: object): Promise<AxiosResponse<any>> {
    return new Promise((resolve) => {
      axios
        .get(adminApiURL + url, {
          headers: this.headers,
          params: params,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          // handling between of 400 to 500 codes
          if (res.response.status === 401) {
            store.dispatch(logout());
          }
          resolve(res);
        });
    });
  }
  /**
   *
   * @param url
   * @param id if id is not in url param, set the id from there
   */
  delete(url: string, id = ''): Promise<AxiosResponse<any>> {
    return new Promise((resolve) => {
      axios
        .delete(adminApiURL + url + id, { headers: this.headers })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          if (res.response.status === 401) {
            store.dispatch(logout());
          }
          resolve(res);
        });
    });
  }
}

export default ApiRequest;
