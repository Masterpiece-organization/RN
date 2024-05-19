import {createContext, useContext, useState} from 'react';
import {useColorScheme} from 'react-native';
import {useIsMutating} from '@tanstack/react-query';
import {
  AuthStateProps,
  ContextState,
  UserStateProps,
  ContextProps,
} from '@/types/contextTypeList';
import {resetGenericPassword} from 'react-native-keychain';

const defaultContextValue: ContextState = {
  colorScheme: 'light',
  themeMode: 'system',
  setMode: () => {},
  isMutating: 0,
  user: {
    email: '',
    nickname: '',
    join_profile: [],
  },
  setUser: () => {},
  getAccessToken: () => null,
  authState: {
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  },
  setAuthState: () => {},
  logout: () => Promise.resolve(),
};

export const MainContext = createContext<ContextState>(defaultContextValue);

export function MainContextProvider({children}: ContextProps) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(
    'system',
  );

  const setMode = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
  };

  let colorScheme = themeMode === 'system' ? systemColorScheme : themeMode;

  const isMutating = useIsMutating();

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

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const logout = async () => {
    await resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  return (
    <MainContext.Provider
      value={{
        colorScheme,
        themeMode,
        setMode,
        isMutating,
        user,
        setUser,
        getAccessToken,
        authState,
        setAuthState,
        logout,
      }}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
