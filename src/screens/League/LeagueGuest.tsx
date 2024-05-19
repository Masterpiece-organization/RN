import {useRef} from 'react';
import {View, Animated} from 'react-native';
import {Avatar, Button, Card, Text} from '@/components';
import {AnimatedFlashList} from '@shopify/flash-list';
import {useScrollStore} from '@/stores/store';
import {
  CommonScreens,
  LeagueTopTabScreenProps,
  LeagueTopTabScreens,
} from '@/types/navigationTypes';

const defaultWrapStyle = 'flex-row items-center rounded-lg bg-white px-5 py-4';

const MOCK_DATA = [
  {
    type: '용병',
    team_size: '남 11vs11',
    date: '10월 10일 화요일 14:00 - 17:00',
    location: '서울 서초구 방배동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 5vs5',
    date: '12월 10일 화요일 14:00 - 17:00',
    location: '서울 은평구 갈현동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 11vs11',
    date: '10월 10일 화요일 14:00 - 17:00',
    location: '서울 서초구 방배동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 5vs5',
    date: '12월 10일 화요일 14:00 - 17:00',
    location: '서울 은평구 갈현동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 11vs11',
    date: '10월 10일 화요일 14:00 - 17:00',
    location: '서울 서초구 방배동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 5vs5',
    date: '12월 10일 화요일 14:00 - 17:00',
    location: '서울 은평구 갈현동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 11vs11',
    date: '10월 10일 화요일 14:00 - 17:00',
    location: '서울 서초구 방배동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 5vs5',
    date: '12월 10일 화요일 14:00 - 17:00',
    location: '서울 은평구 갈현동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 11vs11',
    date: '10월 10일 화요일 14:00 - 17:00',
    location: '서울 서초구 방배동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 5vs5',
    date: '12월 10일 화요일 14:00 - 17:00',
    location: '서울 은평구 갈현동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 11vs11',
    date: '10월 10일 화요일 14:00 - 17:00',
    location: '서울 서초구 방배동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 5vs5',
    date: '12월 10일 화요일 14:00 - 17:00',
    location: '서울 은평구 갈현동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 11vs11',
    date: '10월 10일 화요일 14:00 - 17:00',
    location: '서울 서초구 방배동 1000-1234',
  },
  {
    type: '용병',
    team_size: '남 5vs5',
    date: '12월 10일 화요일 14:00 - 17:00',
    location: '서울 은평구 갈현동 1000-1234',
  },
];

const renderItem = ({item, index}, navigation) => {
  return (
    <Button
      type="text"
      variant="custom"
      className={`${index === 0 && 'mt-4'} mb-2`}
      onPress={() =>
        navigation.navigate(CommonScreens.GUEST_POST_DETAIL_SCREEN)
      }>
      <Card className={defaultWrapStyle}>
        <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
          <Avatar type="club" />
        </View>
        <View>
          <View className="mb-1.5 flex-row space-x-1">
            <View className="py-.5 self-start rounded bg-[#E6F7F1] px-1.5">
              <Text color="text-green" type="caption" weight="semibold">
                용병
              </Text>
            </View>
            <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
              <Text color="text-gray-300" type="caption" weight="semibold">
                남 11vs11
              </Text>
            </View>
          </View>

          <Text weight="bold">10월 10일 화요일 14:00 - 17:00</Text>
          <Text type="caption" color="text-gray-700">
            서울 서초구 방배동 1000-1234
          </Text>
        </View>
      </Card>
    </Button>
  );
};

const LeagueGuest = ({
  navigation,
}: LeagueTopTabScreenProps<LeagueTopTabScreens.LEAGUE_GUEST>) => {
  const {scrollY} = useScrollStore();

  const AnimatedScrollY = useRef(scrollY).current;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: AnimatedScrollY}}}],
    {
      useNativeDriver: true,
    },
  );

  return (
    <View className="relative flex-1 bg-gray-50 px-[15px] dark:bg-black">
      <AnimatedFlashList
        data={MOCK_DATA}
        renderItem={props => renderItem(props, navigation)}
        estimatedItemSize={200}
        keyExtractor={(item, index) => item.type + index}
        onScroll={onScroll}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      />
    </View>
  );
};

export default LeagueGuest;
