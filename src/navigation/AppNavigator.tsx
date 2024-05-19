import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useCallback, useState, useEffect} from 'react';
import {getGenericPassword} from 'react-native-keychain';
import {
  AuthStack,
  MainStack,
  SettingStack,
  BottomTab,
  SettingStackScreen,
} from './index';
import Loader from '@components/Loader';
import useUser from '@/hooks/useUser';
import {AppStackParamList} from '@/types/navigationTypes';
import {useColorScheme} from 'react-native';
import {AuthStackScreen} from '@/navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();
export type ScreenType = typeof Stack.Screen;
export type ColorSchemeType = 'light' | 'dark' | 'system';

const AppNavigator = () => {
  const {getUserInfoQuery} = useUser();

  // const [status, setStatus] = useState('loading');

  // const loadJWT = useCallback(async () => {
  //   try {
  //     const value = await getGenericPassword();

  //     if (value) {
  //       const jwt = JSON.parse(value.password);

  //       setAuthState({
  //         accessToken: jwt.accessToken || null,
  //         refreshToken: jwt.refreshToken || null,
  //         authenticated: jwt.accessToken !== null,
  //       });

  //       getUserInfoQuery.mutate(undefined, {
  //         onError: err => {
  //           const error = err as Error;
  //         },
  //       });

  //       return setStatus('success');
  //     }
  //     setStatus('null');
  //   } catch (err) {
  //     const error = err as Error;
  //     setStatus('error');
  //     console.log(`Keychain Error: ${error?.message}`);
  //     setAuthState({
  //       accessToken: null,
  //       refreshToken: null,
  //       authenticated: false,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   loadJWT();
  // }, [loadJWT]);

  const colorScheme = useColorScheme();

  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
      // background: 'transparent',
    },
  };

  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#16181A',
    },
  };

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <BottomTab />
    </NavigationContainer>
  );
};

export default AppNavigator;
