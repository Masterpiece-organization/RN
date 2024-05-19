import {Animated, View, TouchableOpacity, StatusBar} from 'react-native';
import {BottomSheet, BottomSheetContent, Text} from '@/components';
import {StyledMenuIcon} from '@/constants/icons';
import {useScrollStore} from '@/stores/store';
import {TabScreen} from '@/navigation/LeagueStackScreen';
import {
  LeagueScreenProps,
  LeagueScreens,
  MainScreens,
} from '@/types/navigationTypes';
import useBottomSheet from '@/hooks/useBottomSheet';
import {REFERENCE_DATA} from '@/constants';

const headerHeight = 48;
const minScroll = 100;
const activeRange = 148;

const navigateTo = [
  MainScreens.MATCH_POST_STACK,
  MainScreens.GUEST_POST_STACK,
  MainScreens.CLUB_POST_STACK,
  MainScreens.MEMBER_POST_STACK,
];

const Header = ({navigation, onPress}) => {
  return (
    <View className="flex-row justify-between bg-white dark:bg-black">
      <View className="justify-center">
        <Text type="display" className="ml-[15px]">
          우리들만의 리그
        </Text>
      </View>

      <TouchableOpacity
        className="mr-[18px] h-12 w-12 items-end justify-center"
        onPress={onPress}>
        <StyledMenuIcon className="color-gray-100 dark:color-gray-100" />
      </TouchableOpacity>
    </View>
  );
};

const LeagueMainTab = ({
  navigation,
}: LeagueScreenProps<LeagueScreens.LEAGUE_MAIN_TAB>) => {
  const {bottomSheetRef, open, close} = useBottomSheet();

  const {scrollY} = useScrollStore();

  const diffClampScrollY = Animated.diffClamp(
    scrollY,
    -minScroll,
    activeRange + minScroll,
  );
  const translateY = diffClampScrollY.interpolate({
    inputRange: [0, activeRange],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const handleNavigation = (index: number) => {
    close();
    return navigation.navigate(navigateTo[index]);
  };

  return (
    <>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent>
          <Text type="display" className="mb-5 px-5 text-xl">
            글쓰기
          </Text>
          <View className="px-5">
            {REFERENCE_DATA.POST_MENUS.map((item, i) => (
              <TouchableOpacity
                className="mb-4 flex-row items-center"
                key={item}
                onPress={() => handleNavigation(i)}>
                <Text
                  weight="medium"
                  className="text-lg"
                  color="text-gray-700 dark:text-white">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetContent>
      </BottomSheet>
      <View className="flex-1">
        <StatusBar />
        <Animated.View
          className="flex-1"
          style={{transform: [{translateY: translateY}]}}>
          <Header navigation={navigation} onPress={open} />
          <TabScreen />
        </Animated.View>
      </View>
    </>
  );
};

export default LeagueMainTab;
