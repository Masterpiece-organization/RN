/* eslint-disable react-hooks/exhaustive-deps */
import {useLayoutEffect} from 'react';
import {useColorScheme, SafeAreaView} from 'react-native';
import {
  LeagueMainTab,
  LeagueMatch,
  LeagueGuest,
  LeagueClub,
} from '@/screens/League';
import {
  CommonScreens,
  MainScreens,
  LeagueScreens,
  LeagueStackParamList,
  LeagueTopTabScreens,
  LeagueTopTabStackParamList,
  MainStackParamList,
  BottomTabProps,
  BottomTabScreens,
} from '@/types/navigationTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import useScreenOptions from '@/hooks/useScreenOptions';
import {TabBar} from '@/navigation';
import {
  LevelGuide,
  MapScreen,
  MatchPostDetailScreen,
  GuestPostDetailScreen,
  ClubPostDetailScreen,
  MemberPostDetailScreen,
} from '@/screens/Common';
import getTabBarVisibilityOptions from '@/utils/getTabBarVisibilityOptions';
import {
  ClubPostScreenStack,
  GuestPostScreenStack,
  MatchPostScreensStack,
  MemberPostScreenStack,
} from './MainStackScreen';
const LeagueStack = createNativeStackNavigator<
  LeagueStackParamList & MainStackParamList
>();
const Tab = createMaterialTopTabNavigator<LeagueTopTabStackParamList>();

const renderTabBar = (props: MaterialTopTabBarProps) => <TabBar {...props} />;

export const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={LeagueTopTabScreens.LEAGUE_MATCH}
      tabBar={renderTabBar}>
      <Tab.Screen
        name={LeagueTopTabScreens.LEAGUE_MATCH}
        component={LeagueMatch}
        options={{tabBarLabel: '경기'}}
      />
      <Tab.Screen
        name={LeagueTopTabScreens.LEAGUE_GUEST}
        component={LeagueGuest}
        options={{tabBarLabel: '용병'}}
      />
      <Tab.Screen
        name={LeagueTopTabScreens.LEAGUE_CLUB}
        component={LeagueClub}
        options={{tabBarLabel: '클럽'}}
      />
    </Tab.Navigator>
  );
};

const renderCustomHeader = () => {
  return <SafeAreaView className="bg-white dark:bg-black" />;
};

const LeagueStackScreen = ({
  navigation,
  route,
}: BottomTabProps<BottomTabScreens.LEAGUE_STACK>) => {
  const colorScheme = useColorScheme();

  const {getScreenOptions, getTabScreenOptions} =
    useScreenOptions<LeagueStackParamList>();

  useLayoutEffect(() => {
    getTabBarVisibilityOptions({
      route,
      targetScreen: LeagueScreens.LEAGUE_MAIN_TAB,
      navigation,
      getTabScreenOptions,
    });
  }, [navigation, route, colorScheme]);

  return (
    <LeagueStack.Navigator initialRouteName={LeagueScreens.LEAGUE_MAIN_TAB}>
      <LeagueStack.Screen
        name={LeagueScreens.LEAGUE_MAIN_TAB}
        component={LeagueMainTab}
        options={{
          header: () => renderCustomHeader(),
        }}
      />
      <LeagueStack.Group screenOptions={{headerShown: false}}>
        <LeagueStack.Screen
          name={MainScreens.MATCH_POST_STACK}
          component={MatchPostScreensStack}
        />
        <LeagueStack.Screen
          name={MainScreens.GUEST_POST_STACK}
          component={GuestPostScreenStack}
        />
        <LeagueStack.Screen
          name={MainScreens.CLUB_POST_STACK}
          component={ClubPostScreenStack}
        />
        <LeagueStack.Screen
          name={MainScreens.MEMBER_POST_STACK}
          component={MemberPostScreenStack}
        />
      </LeagueStack.Group>
      <LeagueStack.Group
        screenOptions={({navigation}) => ({
          ...getScreenOptions({
            navigation,
          }),
        })}>
        <LeagueStack.Screen
          name={CommonScreens.LEVEL_GUIDE}
          component={LevelGuide}
          options={{title: ''}}
        />
        <LeagueStack.Screen
          name={CommonScreens.MAP_SCREEN}
          component={MapScreen}
          options={{title: '지도에서 위치 확인'}}
        />
        <LeagueStack.Screen
          name={CommonScreens.MATCH_POST_DETAIL_SCREEN}
          component={MatchPostDetailScreen}
          options={{title: ''}}
        />
        <LeagueStack.Screen
          name={CommonScreens.GUEST_POST_DETAIL_SCREEN}
          component={GuestPostDetailScreen}
          options={{title: ''}}
        />
        <LeagueStack.Screen
          name={CommonScreens.CLUB_POST_DETAIL_SCREEN}
          component={ClubPostDetailScreen}
          options={{title: ''}}
        />
        <LeagueStack.Screen
          name={CommonScreens.MEMBER_POST_DETAIL_SCREEN}
          component={MemberPostDetailScreen}
          options={{title: ''}}
        />
      </LeagueStack.Group>
    </LeagueStack.Navigator>
  );
};

export default LeagueStackScreen;
