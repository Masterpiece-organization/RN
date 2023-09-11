import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import Home from '@/screens/Home/Home';
import {HeaderWrap} from '@/components';
import {
  Login,
  Register,
  Success,
  CheckEmail,
  FindPw,
  ResetPw,
  Nickname,
  Position,
  Terms,
} from '@/screens/Auth';

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
      <Stack.Screen
        name="Nickname"
        options={{headerShown: false}}
        component={Nickname}
      />
      <Stack.Screen
        name="Position"
        options={{
          header: props => headerWrapComponent(props),
        }}
        component={Position}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
