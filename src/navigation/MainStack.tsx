import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Main, Matches, Team, Profile} from '@/screens/Main';
import {
  MainRootStackParamList,
  BottomIconWrapTypes,
} from '@/typings/RootStackParamList';
import {SvgIconProps} from '@/typings/IconTypeList';
import {
  Field as MatchesIcon,
  Team as TeamIcon,
  User as ProfileIcon,
  Home as HomeIcon,
} from '@/assets/icons/iconComponents';
import {useMainContext} from '@/contexts/MainContext';
import {ColorSchemeName} from 'react-native';

const Stack = createNativeStackNavigator<MainRootStackParamList>();
const Tab = createBottomTabNavigator();

const iconWrapper =
  (colorScheme: ColorSchemeName = 'light') =>
  (
    IconComponent: ({
      fillColor,
      strokeColor,
    }: SvgIconProps) => React.JSX.Element,
  ) =>
  ({color, focused}: BottomIconWrapTypes) => {
    const colors = {
      dark: {true: 'red', false: 'white'},
      light: {true: 'blue', false: 'black'},
    };

    if (colorScheme === null) colorScheme = 'light';

    const fillColor = colors[colorScheme][focused ? 'true' : 'false'];

    const strokeColor = colors[colorScheme][focused ? 'true' : 'false'];

    return <IconComponent fillColor={fillColor} strokeColor={strokeColor} />;
  };

const BottomTab = () => {
  const contexts = useMainContext();

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: contexts?.colorScheme === 'dark' ? '#222' : 'white',
          borderColor: '#D4D4D4',
        },
      }}>
      <Tab.Screen
        name="메인"
        component={Main}
        options={{
          tabBarIcon: iconWrapper(contexts?.colorScheme)(HomeIcon),
        }}
      />
      <Tab.Screen
        name="매치"
        component={Matches}
        options={{
          tabBarIcon: iconWrapper(MatchesIcon),
        }}
      />
      <Tab.Screen
        name="클럽"
        component={Team}
        options={{
          tabBarIcon: iconWrapper(TeamIcon),
        }}
      />
      <Tab.Screen
        name="My"
        component={Profile}
        options={{
          tabBarIcon: iconWrapper(ProfileIcon),
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        options={{headerShown: false}}
        component={BottomTab}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

// options={{
//   tabBarIcon: ({color}) => {
//     return (
//       <MatchesIcon
//         color={color}
//         // stroke={color !== '#8E8E8F' ? '#fff' : color}
//         // fill={color !== '#8E8E8F' ? color : 'none'}
//       />
//     );
//   },
// }}
