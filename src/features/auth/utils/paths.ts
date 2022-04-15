import { API_URL } from '../../../constants';

const AUTH_URL = `${API_URL}/auth`;

const paths = {
  login: (): string => `${AUTH_URL}/get-token`,
  getUser: (): string => `${AUTH_URL}/me`,
  refreshToken: (): string => `${AUTH_URL}/refresh-token`,
};

export default paths;
