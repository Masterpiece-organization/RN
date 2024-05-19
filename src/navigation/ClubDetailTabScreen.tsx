/* eslint-disable react-hooks/exhaustive-deps */
import {ClubInfo, ClubSchedule, ClubLineup, ClubSquad} from '@/screens/Club';
import {
  ClubDetailScreens,
  ClubDetailTabParamList,
  ClubManagementTabScreens,
  ClubManagementTabParamList,
} from '@/types/navigationTypes';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {ClubTabBar} from '.';
import {ClubManagementTabBar} from './ClubTabBar';
import {View} from 'react-native';

const Tab = createMaterialTopTabNavigator<ClubDetailTabParamList>();
const ManagementTab =
  createMaterialTopTabNavigator<ClubManagementTabParamList>();

const renderTabBar = (props: MaterialTopTabBarProps) => (
  <ClubTabBar {...props} />
);

const renderManagementTabBar = (props: MaterialTopTabBarProps) => (
  <ClubManagementTabBar {...props} />
);

const ClubManagementTab = () => {
  return (
    <ManagementTab.Navigator
      initialRouteName={ClubManagementTabScreens.CLUB_SQUAD_MANAGEMENT}
      tabBar={renderManagementTabBar}>
      <ManagementTab.Screen
        name={ClubManagementTabScreens.CLUB_SQUAD_MANAGEMENT}
        component={ClubSquad}
        options={{tabBarLabel: '선수 관리'}}
      />
      <ManagementTab.Screen
        name={ClubManagementTabScreens.CLUB_LINEUP_MANAGEMENT}
        component={ClubLineup}
        options={{tabBarLabel: '라인업 관리'}}
      />
    </ManagementTab.Navigator>
  );
};

const ClubDetailTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={ClubDetailScreens.CLUB_INFO}
      tabBar={renderTabBar}>
      <Tab.Screen
        name={ClubDetailScreens.CLUB_INFO}
        component={ClubInfo}
        options={{tabBarLabel: '클럽 정보'}}
      />
      <Tab.Screen
        name={ClubDetailScreens.CLUB_SCHEDULE}
        component={ClubSchedule}
        options={{tabBarLabel: '경기 일정'}}
      />
      <Tab.Screen
        name={ClubDetailScreens.CLUB_MANAGEMENT}
        component={ClubManagementTab}
        options={{tabBarLabel: '클럽 관리'}}
      />
    </Tab.Navigator>
  );
};

export default ClubDetailTabScreen;
