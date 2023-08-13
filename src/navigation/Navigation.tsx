import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import Home from '@/screens/Home/Home';
import Login from '@/screens/Auth/Login';
import Register from '@/screens/Auth/Register';
import {HeaderWrap} from '@/components';

const Stack = createNativeStackNavigator();
const headerWrapComponent = (props: NativeStackHeaderProps) => (
  <HeaderWrap {...props} />
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="Login"
          // options={{headerShown: false}}
          options={{
            header: props => headerWrapComponent(props),
          }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{headerShown: false}}
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
