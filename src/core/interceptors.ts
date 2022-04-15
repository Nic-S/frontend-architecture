import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toastService } from './services/toastService';
import { deleteJwtToken, getJwtToken, setRedirectPagePath } from './services/webStorageService';

export const setJwtInterceptor = (): void => {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getJwtToken();
      if (token) {
        if (config.headers) {
          // eslint-disable-next-line no-param-reassign
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

export const setErrorInterceptor = (): void => {
  axios.interceptors.response.use(
    response => response,
    // eslint-disable-next-line consistent-return
    (error: AxiosError) => {
      const { status } = error.response != null ? error.response : { status: '' };
      const errorMsg =
        (error.response != null &&
          error.response.data != null &&
          (error.response.data.message || error.response.data.error)) ||
        'Sorry, something went wrong!';
      if (status === 401) {
        deleteJwtToken();
        setRedirectPagePath(window.location.pathname);
        window.location.assign('/login');
      } else if (status === 403) {
        toastService.error('Unauthorized');
        return Promise.reject(error);
      } else if (status === 404) {
        toastService.error('Not Found!');
        return Promise.reject(error);
      } else if (error.code === 'ECONNABORTED' || (error.isAxiosError && !error.response)) {
        toastService.error('Network error: please try again later');
        return Promise.reject(error);
      } else {
        toastService.error(Array.isArray(errorMsg) ? (errorMsg as string[]).join('\n') : errorMsg);
        return Promise.reject(error);
      }
    }
  );
};
