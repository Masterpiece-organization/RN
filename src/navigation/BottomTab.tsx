import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabScreens} from '@/types/navigationTypes';
import {BottomTabParamList} from '@/types/navigationTypes';
import {
  MainStackScreen,
  SettingStackScreen,
  LeagueStackScreen,
  ChatStackScreen,
  ClubStackScreen,
} from '@/navigation';
import {ClubMain} from '@/screens/Club';
import useScreenOptions from '@/hooks/useScreenOptions';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  const {getTabScreenOptions} = useScreenOptions<BottomTabParamList>();
  return (
    <Tab.Navigator
      initialRouteName={BottomTabScreens.MAIN_STACK}
      screenOptions={({route}) => getTabScreenOptions({route})}>
      <Tab.Screen
        name={BottomTabScreens.MAIN_STACK}
        component={MainStackScreen}
        options={{tabBarLabel: '메인'}}
      />
      <Tab.Screen
        name={BottomTabScreens.LEAGUE_STACK}
        component={LeagueStackScreen}
        options={{tabBarLabel: '우리그'}}
      />
      <Tab.Screen
        name={BottomTabScreens.CHAT_STACK}
        component={ChatStackScreen}
        options={{tabBarLabel: '채팅'}}
      />
      <Tab.Screen
        name={BottomTabScreens.CLUB_STACK}
        component={ClubStackScreen}
        options={{tabBarLabel: '클럽'}}
      />
      <Tab.Screen
        name={BottomTabScreens.SETTING_STACK}
        component={SettingStackScreen}
        options={{tabBarLabel: '마이'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
