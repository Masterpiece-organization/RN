import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {AppScreens, BottomTabParamList} from '@/types/navigationTypes';
import {RouteProp} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

const getActiveRouteName = (
  route: RouteProp<BottomTabParamList, keyof BottomTabParamList>,
  defaultScreen: AppScreens,
) => {
  return getFocusedRouteNameFromRoute(route) ?? defaultScreen;
};

type RouteType = RouteProp<BottomTabParamList, keyof BottomTabParamList>;

interface GetTabBarOptionProps {
  route: RouteType;
  targetScreen: AppScreens;
  navigation: BottomTabNavigationProp<
    BottomTabParamList,
    keyof BottomTabParamList
  >;
  getTabScreenOptions: ({
    route,
  }: {
    route: RouteProp<BottomTabParamList, keyof BottomTabParamList>;
  }) => BottomTabNavigationOptions;
}

const getTabBarVisibilityOptions = ({
  route,
  targetScreen,
  navigation,
  getTabScreenOptions,
}: GetTabBarOptionProps): BottomTabNavigationOptions => {
  const defaultOptions = getTabScreenOptions({route});
  const defaultTabBarStyle = defaultOptions.tabBarStyle;

  const routeName = getActiveRouteName(route, targetScreen);

  navigation.setOptions({
    tabBarStyle: {
      ...(typeof defaultTabBarStyle === 'object' ? defaultTabBarStyle : {}),
      display: routeName === targetScreen ? undefined : 'none',
    },
  });

  return defaultOptions;
};

export default getTabBarVisibilityOptions;
