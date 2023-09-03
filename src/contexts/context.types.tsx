import {AxiosInstance} from 'axios';
import {Dispatch, SetStateAction} from 'react';
import {ColorSchemeName} from 'react-native';

export interface ContextState {
  colorScheme: ColorSchemeName;
  isMutating: number;
  user: boolean;
  setUser: Dispatch<SetStateAction<boolean>>;
  getAccessToken: () => void;
  authState: AuthStateProps;
  setAuthState: Dispatch<SetStateAction<AuthStateProps>>;
  authenticated?: boolean | null;
  logout: () => void;
}

export interface ApiContextState {
  authInstance?: AxiosInstance;
  instance?: AxiosInstance;
}

export interface AuthStateProps {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated?: boolean | null;
}
