import {ReactNode} from 'react';
import {Dispatch, SetStateAction} from 'react';
import {ColorSchemeName} from 'react-native';

// Common
export interface ContextProps {
  children: ReactNode;
}

// Theme
export type ThemeModeList = 'light' | 'dark' | 'system';

export interface ThemeContextState {
  colorScheme: ColorSchemeName;
  isButtonActive: boolean;
  themeMode: ThemeModeList;
  dispatch: {
    setCurrentThemeMode: (mode: ThemeModeList) => void;
    openActionButton: () => void;
    closeActionButton: () => void;
  };
}

// Api
export interface ApiContextState {
  isMutating: number;
}

// Auth
export interface AuthStateProps {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated?: boolean | null;
}

export interface AuthContextState {
  user: {
    email: string;
    nickname: string;
    join_profile: ProfileItem[];
  };
  dispatch: {
    logout: () => Promise<void>;
    setUser: Dispatch<SetStateAction<UserStateProps>>;
  };
}

interface ProfileItem {
  position: {
    seq: number;
    join_profile: string;
  };
}

export interface UserStateProps {
  email: string;
  nickname: string;
  join_profile: ProfileItem[];
}
