import { useLayoutEffect } from "react";
import { useColorScheme } from "react-native";
import useScreenOptions from "@/hooks/useScreenOptions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClubMain, ClubSearch, ClubCreation, ClubTab } from "@/screens/Club";
import getTabBarVisibilityOptions from "@/utils/getTabBarVisibilityOptions";
import {
  BottomTabProps,
  BottomTabScreens,
  ClubScreens,
  ClubStackParamList,
  CommonScreens,
} from "@/types/navigationTypes";
import { LevelGuide } from "@/screens/Common";

const Stack = createNativeStackNavigator<ClubStackParamList>();

const ClubStack = ({
  navigation,
  route,
}: BottomTabProps<BottomTabScreens.LEAGUE_STACK>) => {
  const colorScheme = useColorScheme();

  const { getScreenOptions, getHeaderRight, getTabScreenOptions } =
    useScreenOptions<ClubStackParamList>();

  useLayoutEffect(() => {
    getTabBarVisibilityOptions({
      route,
      targetScreen: ClubScreens.CLUB_MAIN,
      navigation,
      getTabScreenOptions,
    });
  }, [navigation, route, colorScheme]);

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...getScreenOptions({
          navigation,
        }),
      })}
    >
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={ClubScreens.CLUB_MAIN} component={ClubMain} />
        <Stack.Screen name={ClubScreens.CLUB_SEARCH} component={ClubSearch} />
      </Stack.Group>
      <Stack.Group
        screenOptions={({ navigation }) => ({
          ...getScreenOptions({
            navigation,
            card: true,
          }),
        })}
      >
        <Stack.Screen
          name={ClubScreens.CLUB_DETAIL_TAB}
          component={ClubTab}
          options={({ navigation, route }) => {
            return {
              title: "테스트",
              headerRight: () =>
                getHeaderRight({
                  hasRightContent: "수정",
                  onPress: () =>
                    navigation.navigate(ClubScreens.CLUB_DETAIL_TAB),
                }),
            };
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name={ClubScreens.CLUB_CREATION}
        component={ClubCreation}
        options={{
          title: "클럽 만들기",
        }}
      />
      <Stack.Screen name={CommonScreens.LEVEL_GUIDE} component={LevelGuide} />
    </Stack.Navigator>
  );
};

export default ClubStack;
