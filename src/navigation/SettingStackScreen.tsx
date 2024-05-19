/* eslint-disable react-hooks/exhaustive-deps */
import {useLayoutEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  Setting,
  SettingDetail,
  MatchHistory,
  ProfileEdit,
  MyPage,
  UploadedPost,
  Faq,
  FaqDetail,
} from '@/screens/Setting';
import {
  PositionGuide,
  PositionSetup,
  LevelGuide,
  PlayerProfile,
  ClubProfile,
} from '@/screens/Common';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SettingStackParamList,
  SettingScreens,
  CommonScreens,
  BottomTabScreens,
  BottomTabProps,
} from '@/types/navigationTypes';
import useScreenOptions from '@/hooks/useScreenOptions';
import {StyledSettingIcon} from '@/constants/icons';
import getTabBarVisibilityOptions from '@/utils/getTabBarVisibilityOptions';
import getCommonScreen from '@/utils/getCommonScreen';
const SettingStack = createNativeStackNavigator<SettingStackParamList>();

const SettingStackScreen = ({
  navigation,
  route,
}: BottomTabProps<BottomTabScreens.SETTING_STACK>) => {
  const colorScheme = useColorScheme();

  const {
    getScreenOptions,
    getHeaderRight,
    getHeaderLeftText,
    getTabScreenOptions,
  } = useScreenOptions<SettingStackParamList>();

  useLayoutEffect(() => {
    getTabBarVisibilityOptions({
      route,
      targetScreen: SettingScreens.MY_PAGE,
      navigation,
      getTabScreenOptions,
    });
  }, [navigation, route, colorScheme]);

  return (
    <SettingStack.Navigator initialRouteName={SettingScreens.MY_PAGE}>
      <SettingStack.Group
        screenOptions={({navigation}) => ({
          ...getScreenOptions({
            navigation,
            card: true,
          }),
        })}>
        <SettingStack.Screen
          name={SettingScreens.MY_PAGE}
          component={MyPage}
          options={({navigation}) => {
            return {
              headerLeft: () => getHeaderLeftText('마이페이지'),
              headerRight: () =>
                getHeaderRight({
                  hasRightContent: (
                    <StyledSettingIcon className="color-gray-100 dark:color-gray-100" />
                  ),
                  onPress: () => navigation.navigate(SettingScreens.SETTING),
                }),
            };
          }}
        />
        <SettingStack.Screen
          name={SettingScreens.SETTING}
          component={Setting}
          options={{title: '설정'}}
        />
        <SettingStack.Screen
          name={SettingScreens.SETTING_DETAIL}
          component={SettingDetail}
          options={({route}) =>
            (() => {
              type VariantKey = keyof typeof variants;
              const variants = {
                notification: '푸시알림설정',
                terms: '개인정보설정',
                theme: '테마',
              };

              const titleKey =
                (route.params.type as VariantKey) in variants
                  ? (route.params.type as VariantKey)
                  : 'theme';

              return {
                title: variants[titleKey],
              };
            })()
          }
        />
        <SettingStack.Screen
          name={SettingScreens.UPLOADED_POST}
          component={UploadedPost}
          options={{title: '업로드한 게시글'}}
        />

        <SettingStack.Screen
          name={CommonScreens.PLAYER_PROFILE}
          component={PlayerProfile}
          options={({navigation, route}) => {
            return {
              title: route.params.name,
              headerRight: () =>
                getHeaderRight({
                  hasRightContent: '수정',
                  onPress: () =>
                    navigation.navigate(SettingScreens.PROFILE_EDIT),
                }),
            };
          }}
        />
        <SettingStack.Screen
          name={CommonScreens.CLUB_PROFILE}
          component={ClubProfile}
          options={{
            headerShown: false,
          }}
        />
      </SettingStack.Group>

      <SettingStack.Group
        screenOptions={({navigation}) => ({
          ...getScreenOptions({
            navigation,
          }),
        })}>
        <SettingStack.Screen
          name={SettingScreens.PROFILE_EDIT}
          component={ProfileEdit}
          options={{title: '프로필 설정'}}
        />
        <SettingStack.Screen
          name={SettingScreens.MATCH_HISTORY}
          component={MatchHistory}
          options={{title: '경기이력'}}
        />

        <SettingStack.Screen name={SettingScreens.FAQ} component={Faq} />
        <SettingStack.Screen
          name={SettingScreens.FAQ_DETAIL}
          component={FaqDetail}
        />
        <SettingStack.Screen
          name={CommonScreens.POSITION_GUIDE}
          component={PositionGuide}
        />
        <SettingStack.Screen
          name={CommonScreens.POSITION_SETUP}
          component={PositionSetup}
          options={({navigation}) => ({
            headerRight: () =>
              getHeaderRight({
                hasRightContent: '포지션 정보',
                onPress: () =>
                  navigation.navigate(CommonScreens.POSITION_GUIDE),
              }),
          })}
        />
        <SettingStack.Screen
          name={CommonScreens.LEVEL_GUIDE}
          component={LevelGuide}
        />
      </SettingStack.Group>
    </SettingStack.Navigator>
  );
};

export default SettingStackScreen;
