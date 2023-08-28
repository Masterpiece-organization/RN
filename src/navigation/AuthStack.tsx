import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import Home from '@/screens/Home/Home';
import Login from '@/screens/Auth/Login';
import Register from '@/screens/Auth/Register';
import Success from '@/screens/Auth/Success';
import CheckEmail from '@/screens/Auth/CheckEmail';
import FindPw from '@/screens/Auth/FindPw';
import ResetPw from '@/screens/Auth/ResetPw';
import Terms from '@/screens/Auth/Terms';
import {HeaderWrap} from '@/components';

import {RootStackParamList} from '@/typings/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();
const headerWrapComponent = (props: NativeStackHeaderProps) => (
  <HeaderWrap {...props} />
);

const AuthStack = () => {
  return (
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
        name="CheckEmail"
        options={{
          header: props => headerWrapComponent(props),
        }}
        component={CheckEmail}
      />
      <Stack.Screen
        name="Register"
        options={{
          header: props => headerWrapComponent(props),
        }}
        component={Register}
      />
      <Stack.Screen
        name="Success"
        options={{headerShown: false}}
        component={Success}
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
  );
};

export default AuthStack;
