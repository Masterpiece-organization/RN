import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useMainContext} from '@/contexts/MainContext';

const Navigation = () => {
  const contexts = useMainContext();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: contexts?.colorScheme === 'dark' ? '#222' : 'white',
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      {contexts?.user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
