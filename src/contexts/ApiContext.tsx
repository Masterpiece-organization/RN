import {MainContext} from './MainContext';
import {createContext, ReactNode, useContext} from 'react';
import {SERVER_URL} from '@env';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import {ApiContextState} from './context.types';

interface ContextProps {
  children: ReactNode;
}

const ApiContext = createContext<ApiContextState | null>(null);
const baseURL = SERVER_URL;

export const ApiProvider = ({children}: ContextProps) => {
  const authContext = useContext(MainContext);

  const authInstance = axios.create({
    baseURL,
    timeout: 1000,
  });

  const instance = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 1000,
  });

  authInstance.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext?.getAccessToken()}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = (failedRequset: {
    response: {config: {headers: {Authorization: string}}};
  }) => {
    const data = {
      refresh_token: authContext?.authState.refreshToken,
    };

    const options = {
      method: 'POST',
      data,
      url: `${baseURL}url/token/refresh`,
    };

    return (
      axios(options)
        .then(async tokenRefreshResponse => {
          failedRequset.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.accessToken}`;

          authContext?.setAuthState({
            ...authContext.authState,
            accessToken: tokenRefreshResponse.data.accessToken,
          });

          await Keychain.setGenericPassword(
            'token',
            JSON.stringify({
              accessToken: tokenRefreshResponse.data.accessToken,
              refreshToken: authContext?.authState.refreshToken,
            }),
          );

          return Promise.resolve();
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch(e => {
          authContext?.setAuthState({
            accessToken: null,
            refreshToken: null,
          });
          Keychain.resetGenericPassword();
        })
    );
  };

  createAuthRefreshInterceptor(authInstance, refreshAuthLogic, {});

  return (
    <ApiContext.Provider value={{authInstance, instance}}>
      {children}
    </ApiContext.Provider>
  );
};

// export {ApiProvider, ApiContext};

export function useApiContext() {
  return useContext(ApiContext);
}
