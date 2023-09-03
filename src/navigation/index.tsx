import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useMainContext} from '@/contexts/MainContext';
import {useCallback, useState, useEffect} from 'react';
import {getGenericPassword} from 'react-native-keychain';
import Loader from '@components/Loader';

const Navigation = () => {
  const contexts = useMainContext();

  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await getGenericPassword();

      if (value) {
        const jwt = JSON.parse(value.password);

        contexts?.setAuthState({
          accessToken: jwt.accessToken || null,
          refreshToken: jwt.refreshToken || null,
          authenticated: jwt.accessToken !== null,
        });
        return setStatus('success');
      }
      setStatus('null');
    } catch (err) {
      const error = err as Error;
      setStatus('error');
      console.log(`Keychain Error: ${error?.message}`);
      contexts?.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: contexts?.colorScheme === 'dark' ? '#222' : 'white',
    },
  };

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      {contexts?.authState?.authenticated === false ? (
        <AuthStack />
      ) : (
        <MainStack />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
