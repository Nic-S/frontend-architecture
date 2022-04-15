import axios, { AxiosResponse } from 'axios';
import paths from '../utils/paths';
import { toUser, User } from '../model/user';
import { UserResponse } from '../model/userResponse';
import { setJwtToken } from '../../../core/services/webStorageService';

const api = {
  login: async (): Promise<void> => {
    const response = await axios.post(paths.login());
    setTokenAndTimeout(response.data.access_token);
  },
  getUser: async (): Promise<User> => {
    const response = await axios.get<UserResponse>(paths.getUser());
    return toUser(response.data);
  },
  refreshToken: async (): Promise<AxiosResponse> => {
    return axios.get(paths.refreshToken());
  },
};

const refreshAndSetTimeout = async () => {
  const response = await api.refreshToken();
  setTokenAndTimeout(response.data.access_token);
};

const setTokenAndTimeout = (token: string) => {
  setJwtToken(token);
  setTimeout(async () => {
    await refreshAndSetTimeout();
  }, 45 * 60000);
};

export default api;
