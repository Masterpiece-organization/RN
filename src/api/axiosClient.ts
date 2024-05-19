import {createAxiosClient} from './createAxiosClient';
import {useAuthStore, TokenTypes} from '@/stores/store';
import {SERVER_URL} from '@env';

const REFRESH_TOKEN_URL = `${SERVER_URL}url/token/refresh`;

function getCurrentAccessToken() {
  return useAuthStore.getState().authState.accessToken as string;
}

function getCurrentRefreshToken() {
  return useAuthStore.getState().authState.refreshToken as string;
}

function setRefreshedTokens(tokens: TokenTypes) {
  const login = useAuthStore.getState().login;
  login(tokens);
}

async function logout() {
  const _logout = useAuthStore.getState().logout;
  _logout();
}

export const client = createAxiosClient({
  options: {
    baseURL: SERVER_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl: REFRESH_TOKEN_URL,
  logout,
  setRefreshedTokens,
});
