import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import Home from '@/screens/Home/Home';
import Login from '@/screens/Auth/Login';
import Register from '@/screens/Auth/Register';
import RegisterSuccess from '@/screens/Auth/RegisterSuccess';
import FindPw from '@/screens/Auth/FindPw';
import ResetPw from '@/screens/Auth/ResetPw';
import Terms from '@/screens/Auth/Terms';
import {HeaderWrap} from '@/components';
import {useMainContext} from '@/context/MainContext';
import {RootStackParamList} from '@/typings/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();
const headerWrapComponent = (props: NativeStackHeaderProps) => (
  <HeaderWrap {...props} />
);

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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="Login"
          options={{
            header: props => headerWrapComponent(props),
          }}
          component={Login}
        />
        <Stack.Screen
          name="Terms"
          options={{
            header: props => headerWrapComponent(props),
          }}
          component={Terms}
        />
        <Stack.Screen
          name="Register"
          options={{
            header: props => headerWrapComponent(props),
          }}
          component={Register}
        />
        <Stack.Screen
          name="RegisterSuccess"
          options={{
            header: props => headerWrapComponent(props),
          }}
          component={RegisterSuccess}
        />
        <Stack.Screen
          name="FindPw"
          options={{
            header: props => headerWrapComponent(props),
          }}
          component={FindPw}
        />
        <Stack.Screen
          name="ResetPw"
          options={{
            header: props => headerWrapComponent(props),
          }}
          component={ResetPw}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
