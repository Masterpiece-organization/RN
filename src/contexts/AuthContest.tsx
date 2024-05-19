import {createContext, useContext, useState} from 'react';
import {resetGenericPassword} from 'react-native-keychain';
import {
  AuthContextState,
  ContextProps,
  UserStateProps,
  AuthStateProps,
} from '@/types/contextTypeList';
import {SERVER_URL} from '@env';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import {authInstance} from '@/utils/instance';

// URL
const baseURL = SERVER_URL;

const defaultValue: AuthContextState = {
  user: {
    email: '',
    nickname: '',
    join_profile: [],
  },
  dispatch: {
    logout: async () => {},
    setUser: () => {},
  },
};

export const AuthContext = createContext<AuthContextState>(defaultValue);

export function AuthContextProvider({children}: ContextProps) {
  const [authState, setAuthState] = useState<AuthStateProps>({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  });

  const [user, setUser] = useState<UserStateProps>({
    email: '',
    nickname: '',
    join_profile: [],
  });

  authInstance.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authState.accessToken}`;
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
      refresh_token: authState.refreshToken,
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

          setAuthState({
            ...authState,
            accessToken: tokenRefreshResponse.data.accessToken,
          });

          await Keychain.setGenericPassword(
            'token',
            JSON.stringify({
              accessToken: tokenRefreshResponse.data.accessToken,
              refreshToken: authState.refreshToken,
            }),
          );

          return Promise.resolve();
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch(e => {
          setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false,
          });
          Keychain.resetGenericPassword();
        })
    );
  };

  createAuthRefreshInterceptor(authInstance, refreshAuthLogic, {});

  const logout = async () => {
    await resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const value = {
    user,
    dispatch: {logout, setUser},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
