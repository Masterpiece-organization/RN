import {AxiosInstance} from 'axios';
import {Dispatch, SetStateAction} from 'react';
import {ColorSchemeName} from 'react-native';

export interface ContextState {
  colorScheme: ColorSchemeName;
  themeMode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  isMutating: number;
  user: UserStateProps;
  setUser: Dispatch<SetStateAction<UserStateProps>>;
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

interface Position {
  seq: number;
  join_profile: string;
}
interface ProfileItem {
  position: Position;
}
export interface UserStateProps {
  email: string;
  nickname: string;
  join_profile: ProfileItem[];
}
