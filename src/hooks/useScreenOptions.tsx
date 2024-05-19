import {ReactNode} from 'react';
import {Platform, useColorScheme, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {StyledLeftIcon} from '@/constants/icons';
import {Text} from '@/components';
import {Header, HeaderBackButtonProps} from '@react-navigation/elements';
import {
  AppStackParamList,
  ScreenOptionParams,
  BottomTabProps,
  BottomTabParamList,
  BottomTabScreens,
} from '@/types/navigationTypes';
import {commonStyles} from '@/theme';
import {
  HomeIcon,
  ChatIcon,
  ClubTabIcon,
  MatchIcon,
  MyIcon,
} from '@/assets/icons';
import {
  BottomTabScreenProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

interface HeaderRightProps {
  hasRightContent: string | ReactNode;
  onPress: () => void;
}
type TabBarIconVariantKey =
  | 'MainStack'
  | 'LeagueStack'
  | 'ChatStack'
  | 'ClubStack'
  | 'SettingStack';

const tabBarIconVariants = {
  MainStack: (color: string) => (
    <HomeIcon color={color} width={26} height={26} />
  ),
  LeagueStack: (color: string) => (
    <MatchIcon color={color} width={26} height={26} />
  ),
  ChatStack: (color: string) => (
    <ChatIcon color={color} width={26} height={26} />
  ),
  ClubStack: (color: string) => (
    <ClubTabIcon color={color} width={26} height={26} />
  ),
  SettingStack: (color: string) => (
    <MyIcon color={color} width={26} height={26} />
  ),
};

const useScreenOptions = <T extends ParamListBase>() => {
  // const {top} = useSafeAreaInsets();
  //   height: 60 + top,
  // const isAndroid = Platform.OS === 'android';
  const colorScheme = useColorScheme();
  const getScreenOptions = ({
    navigation,
    card = false,
  }: // route,
  {
    navigation: NativeStackNavigationProp<
      AppStackParamList,
      keyof AppStackParamList
    >;
    card?: boolean;
    // route: RouteProp<T, keyof T>;
  }): NativeStackNavigationOptions => {
    return {
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'WantedSans-SemiBold',
      },
      headerStyle: {
        backgroundColor:
          colorScheme === 'dark' ? '#16181A' : card ? '#F2F4F6' : '#fff',
      },
      header: ({options}) => {
        return (
          <SafeAreaView className="flex-1 pb-3">
            <Header
              headerShadowVisible={false}
              title={''}
              {...options}
              headerLeft={({
                // canGoBack = false,
                ...props
              }: HeaderBackButtonProps) =>
                options.headerLeft
                  ? options.headerLeft({
                      ...props,
                      canGoBack: navigation.canGoBack(),
                    })
                  : getHeaderLeft(navigation)
              }
              headerRight={props =>
                options.headerRight?.({
                  ...props,
                  canGoBack: navigation.canGoBack(),
                })
              }
            />
          </SafeAreaView>
        );
      },
    };
  };

  const getHeaderLeft = (
    navigation: NativeStackNavigationProp<
      AppStackParamList,
      keyof AppStackParamList
    >,
    pop = false,
  ) => {
    return (
      <TouchableOpacity
        onPress={() => (pop ? navigation.pop(2) : navigation.goBack())}
        className="ml-[15px] h-12 w-12 items-start justify-center">
        <StyledLeftIcon
          width={24}
          height={24}
          className="color-black dark:color-white"
        />
      </TouchableOpacity>
    );
  };

  const getHeaderLeftText = (title: string) => {
    return (
      <Text type="display" className="ml-[15px]">
        {title}
      </Text>
    );
  };

  const getHeaderRight = ({hasRightContent, onPress}: HeaderRightProps) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="mr-[18px] h-12 items-end justify-center">
        {typeof hasRightContent === 'string' ? (
          <Text weight="semibold">{hasRightContent}</Text>
        ) : (
          hasRightContent
        )}
      </TouchableOpacity>
    );
  };

  const getTabScreenOptions = ({
    route,
  }: {
    route: RouteProp<BottomTabParamList, keyof BottomTabParamList>;
  }): BottomTabNavigationOptions => {
    return {
      tabBarIcon: ({color}: {color: string}) => {
        const key = route.name as TabBarIconVariantKey;
        const IconComponent = tabBarIconVariants[key];
        return IconComponent ? IconComponent(color) : null;
      },
      tabBarStyle: {
        backgroundColor: colorScheme === 'dark' ? '#2A2C2E' : '#fff',
        borderColor: colorScheme === 'dark' ? '#3E4042' : '#ebedef',
        borderTopColor: colorScheme === 'dark' ? '#3E4042' : '#ebedef',
        ...commonStyles.tabStyle,
      },
      tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#121212',
      tabBarInactiveTintColor: colorScheme === 'dark' ? '#525456' : '#b0b0b0',
      headerShown: false,
      tabBarLabelStyle: {
        ...commonStyles.tabLabelStyle,
      },
    };
  };

  return {
    getScreenOptions,
    getHeaderLeft,
    getHeaderLeftText,
    getHeaderRight,
    getTabScreenOptions,
  };
};

export default useScreenOptions;
