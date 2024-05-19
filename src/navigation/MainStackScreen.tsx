/* eslint-disable react-hooks/exhaustive-deps */
import {useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {Main, Notification} from '@/screens/Main';
import {
  LocationSearch,
  LocationDetail,
} from '@/screens/Main/LocationSearchStack';
import {
  MatchLocationSelection,
  MatchDateSelection,
  MatchTypeSelection,
  MatchDetailinputs,
  MatchAnnouncementInputs,
} from '@/screens/Main/MatchPostStack';
import {
  LevelGuide,
  ClubSelection,
  MatchSchedule,
  MapScreen,
} from '@/screens/Common';
import {
  MainScreens,
  MainStackParamList,
  MatchPostScreens,
  MatchPostStackParamList,
  LocationSearchStackParamList,
  LocationSearchScreens,
  CommonScreens,
  GuestPostStackParamList,
  GuestPostScreens,
  ClubPostStackParamList,
  ClubPostScreens,
  MemberPostStackParamList,
  MemberPostScreens,
  BottomTabProps,
  BottomTabScreens,
  BottomTabParamList,
} from '@/types/navigationTypes';
import useScreenOptions from '@/hooks/useScreenOptions';
import {
  GeustMatchSelection,
  GuestDetailInputs,
  GuestAnnouncementInputs,
} from '@/screens/Main/GuestPostStack';
import {
  ClubAnnouncementInputs,
  ClubDetailInputs,
} from '@/screens/Main/ClubPostStack';
import {MemberAnnouncementInputs} from '@/screens/Main/MemberPostStack';
import getTabBarVisibilityOptions from '@/utils/getTabBarVisibilityOptions';

const MainStack = createNativeStackNavigator<MainStackParamList>();
const MatchPostStack = createNativeStackNavigator<MatchPostStackParamList>();
const LocationSearchStack =
  createNativeStackNavigator<LocationSearchStackParamList>();
const GuestPostStack = createNativeStackNavigator<GuestPostStackParamList>();
const ClubPostStack = createNativeStackNavigator<ClubPostStackParamList>();
const MemberPostStack = createNativeStackNavigator<MemberPostStackParamList>();

export const MemberPostScreenStack = () => {
  const {getScreenOptions} = useScreenOptions<MemberPostStackParamList>();

  return (
    <MemberPostStack.Navigator
      initialRouteName={MemberPostScreens.MEMBER_ANNOUNCEMENT_INPUTS}
      screenOptions={({navigation}) => ({
        ...getScreenOptions({
          navigation,
        }),
        title: '클럽 구하기',
      })}>
      <MemberPostStack.Screen
        name={MemberPostScreens.MEMBER_ANNOUNCEMENT_INPUTS}
        component={MemberAnnouncementInputs}
      />
    </MemberPostStack.Navigator>
  );
};

export const ClubPostScreenStack = () => {
  const {getScreenOptions} = useScreenOptions<ClubPostStackParamList>();
  return (
    <ClubPostStack.Navigator
      initialRouteName={CommonScreens.CLUB_SELECTION}
      screenOptions={({navigation}) => ({
        ...getScreenOptions({
          navigation,
        }),
        title: '팀원 구하기',
      })}>
      <ClubPostStack.Screen
        name={CommonScreens.CLUB_SELECTION}
        component={ClubSelection}
        initialParams={{type: 'clubPosting'}}
      />
      <ClubPostStack.Screen
        name={ClubPostScreens.CLUB_DETAIL_INPUTS}
        component={ClubDetailInputs}
      />
      <ClubPostStack.Screen
        name={ClubPostScreens.CLUB_ANNOUNCEMENT_INPUTS}
        component={ClubAnnouncementInputs}
      />
      <ClubPostStack.Screen
        name={CommonScreens.LEVEL_GUIDE}
        component={LevelGuide}
      />
    </ClubPostStack.Navigator>
  );
};

export const GuestPostScreenStack = () => {
  const {getScreenOptions} = useScreenOptions<GuestPostStackParamList>();
  return (
    <GuestPostStack.Navigator
      initialRouteName={CommonScreens.CLUB_SELECTION}
      screenOptions={({navigation}) => ({
        ...getScreenOptions({
          navigation,
        }),
        title: '용병 글쓰기',
      })}>
      <GuestPostStack.Screen
        name={CommonScreens.CLUB_SELECTION}
        component={ClubSelection}
        initialParams={{type: 'guest'}}
      />
      <GuestPostStack.Screen
        name={GuestPostScreens.GUEST_MATCH_SELECTION}
        component={GeustMatchSelection}
      />
      <GuestPostStack.Screen
        name={CommonScreens.MATCH_SCHEDULE}
        component={MatchSchedule}
        options={{title: ''}}
      />
      <GuestPostStack.Screen
        name={GuestPostScreens.GUEST_DETAIL_INPUTS}
        component={GuestDetailInputs}
      />
      <GuestPostStack.Screen
        name={GuestPostScreens.GUEST_ANNOUNCEMENT_INPUTS}
        component={GuestAnnouncementInputs}
      />
      <GuestPostStack.Screen
        name={CommonScreens.LEVEL_GUIDE}
        component={LevelGuide}
      />
    </GuestPostStack.Navigator>
  );
};

export const LocationSearchScreenStack = () => {
  const {getScreenOptions} = useScreenOptions<LocationSearchStackParamList>();
  return (
    <LocationSearchStack.Navigator
      initialRouteName={LocationSearchScreens.LOCATION_SEARCH}
      screenOptions={({navigation}) => ({
        ...getScreenOptions({
          navigation,
        }),
      })}>
      <LocationSearchStack.Screen
        name={LocationSearchScreens.LOCATION_SEARCH}
        component={LocationSearch}
        options={{title: '주소 입력'}}
      />
      <LocationSearchStack.Screen
        name={LocationSearchScreens.LOCATION_DETAIL}
        component={LocationDetail}
        options={{title: '상세주소 입력'}}
      />
      <LocationSearchStack.Screen
        name={CommonScreens.MAP_SCREEN}
        component={MapScreen}
        options={{title: '지도에서 위치 확인'}}
      />
    </LocationSearchStack.Navigator>
  );
};

export const MatchPostScreensStack = () => {
  const {getScreenOptions} = useScreenOptions<MatchPostStackParamList>();
  return (
    <MatchPostStack.Navigator
      initialRouteName={CommonScreens.CLUB_SELECTION}
      screenOptions={({navigation}) => ({
        ...getScreenOptions({
          navigation,
        }),
        title: '경기 글쓰기',
      })}>
      <MatchPostStack.Screen
        name={CommonScreens.CLUB_SELECTION}
        component={ClubSelection}
        initialParams={{type: 'match'}}
      />
      <MatchPostStack.Screen
        name={MatchPostScreens.MATCH_TYPE_SELECTION}
        component={MatchTypeSelection}
      />
      <MatchPostStack.Screen
        name={MatchPostScreens.MATCH_DATE_SELECTION}
        component={MatchDateSelection}
      />
      <MatchPostStack.Screen
        name={MatchPostScreens.MATCH_LOCATION_SELECTION}
        component={MatchLocationSelection}
      />
      <MatchPostStack.Screen
        name={MatchPostScreens.LOCATION_SEARCH_STACK}
        component={LocationSearchScreenStack}
        options={{headerShown: false}}
      />
      <MatchPostStack.Screen
        name={MatchPostScreens.MATCH_DETAIL_INPUTS}
        component={MatchDetailinputs}
      />
      <MatchPostStack.Screen
        name={CommonScreens.LEVEL_GUIDE}
        component={LevelGuide}
        options={{title: ''}}
      />
      <MatchPostStack.Screen
        name={MatchPostScreens.MATCH_ANNOUNCEMENT_INPUTS}
        component={MatchAnnouncementInputs}
      />
    </MatchPostStack.Navigator>
  );
};

const MainStackScreen = ({
  navigation,
  route,
}: BottomTabProps<BottomTabScreens.MAIN_STACK>) => {
  const colorScheme = useColorScheme();

  const {getScreenOptions, getTabScreenOptions} = useScreenOptions<
    MainStackParamList & BottomTabParamList
  >();

  useLayoutEffect(() => {
    getTabBarVisibilityOptions({
      route,
      targetScreen: MainScreens.MAIN,
      navigation,
      getTabScreenOptions,
    });
  }, [navigation, route, colorScheme]);

  return (
    <MainStack.Navigator initialRouteName={MainScreens.MAIN}>
      <MainStack.Group
        screenOptions={({navigation}) => ({
          ...getScreenOptions({
            navigation,
            card: true,
          }),
        })}>
        <MainStack.Screen
          name={MainScreens.MAIN}
          component={Main}
          options={{headerShown: false}}
        />
      </MainStack.Group>
      <MainStack.Group
        screenOptions={({navigation}) => ({
          ...getScreenOptions({
            navigation,
          }),
        })}>
        <MainStack.Screen
          name={MainScreens.MATCH_POST_STACK}
          component={MatchPostScreensStack}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name={MainScreens.GUEST_POST_STACK}
          component={GuestPostScreenStack}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name={MainScreens.CLUB_POST_STACK}
          component={ClubPostScreenStack}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name={MainScreens.MEMBER_POST_STACK}
          component={MemberPostScreenStack}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name={CommonScreens.MATCH_SCHEDULE}
          component={MatchSchedule}
          options={{title: '경기일정'}}
        />
        <MainStack.Screen
          name={MainScreens.NOTIFICATION}
          component={Notification}
          options={{title: '알림'}}
        />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
