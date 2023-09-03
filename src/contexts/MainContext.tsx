import {createContext, ReactNode, useContext, useState} from 'react';
import {useColorScheme} from 'react-native';
import {useIsMutating} from '@tanstack/react-query';
import {AuthStateProps, ContextState} from './context.types';
import {resetGenericPassword} from 'react-native-keychain';
interface ContextProps {
  children: ReactNode;
}

export const MainContext = createContext<ContextState | null>(null);

export function MainContextProvider({children}: ContextProps) {
  const colorScheme = useColorScheme();

  const isMutating = useIsMutating();

  const [authState, setAuthState] = useState<AuthStateProps>({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
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

  const [user, setUser] = useState<boolean>(false);

  return (
    <MainContext.Provider
      value={{
        colorScheme,
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
