import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '@/screens/Main/Main';
import {MainRootStackParamList} from '@/typings/RootStackParamList';

const Stack = createNativeStackNavigator<MainRootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={Main}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
