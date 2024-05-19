import createAuthRefreshInterceptor from 'axios-auth-refresh';
import axios from 'axios';
import {create} from 'zustand';
import {SERVER_URL} from '@env';
import {authInstance} from '@/utils/instance';
import {resetGenericPassword} from 'react-native-keychain';
import * as Keychain from 'react-native-keychain';
import {optionTypes} from '@/screens/Setting/SettingDetail';
import {Animated} from 'react-native';
import {useColorScheme, ColorSchemeName} from 'react-native';

interface ProfileItem {
  position: {
    seq: number;
    join_profile: string;
  };
}

export interface TokenTypes {
  accessToken: string;
  refreshToken: string;
}

type AuthStateTypes = {
  user: {
    email: string;
    nickname: string;
    join_profile: ProfileItem[];
  };
  authState: {
    accessToken: string | null;
    refreshToken: string | null;
    // authenticated: boolean;
  };
  setUser: (newUser: AuthStateTypes['user']) => void;
  login: (tokens: TokenTypes) => void;
  logout: () => void;
};

const initialState = {
  user: {
    email: '',
    nickname: '',
    join_profile: [],
  },

  authState: {
    accessToken: null,
    refreshToken: null,
  },
};

interface ThemeStoreState {
  currentTheme: optionTypes | null;
  setCurrentTheme: (selectedTheme: optionTypes) => void;
}

interface ScrollState {
  scrollY: Animated.Value;
  // setScrollY: (value: number) => void;
}

/**
 * THEME
 */

// export const useThemeStore = create<ThemeStoreState>(set => ({
//   currentTheme: null,
//   setCurrentTheme: (selectedTheme: optionTypes) =>
//     set({currentTheme: selectedTheme}),
// }));
/**
 * COLOR SCHEME
 */
// export const useThemeStore = create<ThemeStore>(set => ({
//   colorScheme: useColorScheme(),
//   setColorScheme: colorScheme => set({colorScheme}),
// }));

export const useThemeStore = create<ThemeStoreState>(set => ({
  currentTheme: null,
  setCurrentTheme: (selectedTheme: optionTypes) =>
    set({currentTheme: selectedTheme}),
}));

/**
 * SCROLL
 */
export const useScrollStore = create<ScrollState>(set => ({
  scrollY: new Animated.Value(0),
  // setScrollY: (value: number) =>
  //   set(state => ({scrollY: new Animated.Value(value)})),
}));

// export const useScrollStore = create<ScrollState>(set => ({
//   scrollY: 0,
//   setScrollY: (value: number) => set({scrollY: value}),
//   scrollYAnimated: new Animated.Value(0), // 초기화 시 한 번만 생성
// }));

// export const useScrollStore = create<ScrollState>(set => ({
//   scrollY: new Animated.Value(0),
//   // 이제 scrollY의 값을 업데이트하는 대신, scrollY Animated.Value 인스턴스의 setValue 메서드를 사용합니다.
//   setScrollYValue: (value: number) =>
//     set(state => {
//       state.scrollY.setValue(value); // 여기서는 scrollY 인스턴스를 유지하면서 값만 업데이트합니다.
//     }),
// }));

/**
 * AUTH
 */

export const useAuthStore = create<AuthStateTypes>(set => ({
  ...initialState,

  setUser: newUser => set({user: newUser}),
  login: async (tokens: TokenTypes) => {
    await Keychain.setGenericPassword(
      'token',
      JSON.stringify({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }),
    );

    set({authState: {...tokens}});
  },
  logout: async () => {
    await resetGenericPassword();
    set({...initialState});
  },
}));

/**
 * API
 */

export const useApiStore = create(set => ({
  isMutating: 0,
  setIsMutating: (value: number) => {
    set({isMutating: value});
  },
}));

// logout: async () => {
//   await resetGenericPassword();
//   set({
//     authState: {accessToken: null, refreshToken: null, authenticated: false},
//   });
// },

// authInstance.interceptors.request.use(
//   config => {
//     const {authState} = useAuthStore.getState();
//     if (!config.headers.Authorization) {
//       config.headers.Authorization = `Bearer ${authState.accessToken}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// const refreshAuthLogic = (failedRequest: {
//   response: {config: {headers: {Authorization: string}}};
// }) => {
//   const {authState, setAuthState} = useAuthStore.getState();

//   const data = {
//     refresh_token: authState.refreshToken,
//   };

//   const options = {
//     method: 'POST',
//     data,
//     url: `${baseURL}url/token/refresh`,
//   };

//   return (
//     axios(options)
//       .then(async tokenRefreshResponse => {
//         failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.accessToken}`;

//         setAuthState({
//           ...authState,
//           accessToken: tokenRefreshResponse.data.accessToken,
//         });

//         await Keychain.setGenericPassword(
//           'token',
//           JSON.stringify({
//             accessToken: tokenRefreshResponse.data.accessToken,
//             refreshToken: authState.refreshToken,
//           }),
//         );

//         return Promise.resolve();
//       })
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       .catch(e => {
//         setAuthState({
//           accessToken: null,
//           refreshToken: null,
//           authenticated: false,
//         });
//         Keychain.resetGenericPassword();
//       })
//   );
// };

// createAuthRefreshInterceptor(authInstance, refreshAuthLogic);
