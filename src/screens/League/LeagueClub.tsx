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
    type: '입단',
    gender: '남성',
    title: '축구하고싶습니다',
    user: '축구맨',
  },
  {
    type: '영입',
    gender: '남성',
    title: '은평구 축구클럽입니다.',
    user: '레알마드리드',
  },
  {
    type: '입단',
    gender: '남성',
    title: '축구하고싶습니다',
    user: '축구맨',
  },
  {
    type: '영입',
    gender: '남성',
    title: '성실하신분 찾습니다',
    user: '레알마드리드',
  },
  {
    type: '입단',
    gender: '남성',
    title: '축구하고싶습니다',
    user: '축구맨',
  },
  {
    type: '영입',
    gender: '남성',
    title: '성실하신분 찾습니다',
    user: '레알마드리드',
  },
  {
    type: '입단',
    gender: '남성',
    title: '축구하고싶습니다',
    user: '축구맨',
  },
  {
    type: '영입',
    gender: '남성',
    title: '성실하신분 찾습니다',
    user: '레알마드리드',
  },
  {
    type: '입단',
    gender: '남성',
    title: '축구하고싶습니다',
    user: '축구맨',
  },
  {
    type: '영입',
    gender: '남성',
    title: '성실하신분 찾습니다',
    user: '레알마드리드',
  },
  {
    type: '입단',
    gender: '남성',
    title: '축구하고싶습니다',
    user: '축구맨',
  },
  {
    type: '영입',
    gender: '남성',
    title: '성실하신분 찾습니다',
    user: '레알마드리드',
  },
  {
    type: '입단',
    gender: '남성',
    title: '축구하고싶습니다',
    user: '축구맨',
  },
  {
    type: '영입',
    gender: '남성',
    title: '성실하신분 찾습니다',
    user: '레알마드리드',
  },
];

const renderItem = ({item, index}, navigation) => {
  return (
    <Button
      type="text"
      variant="custom"
      className={`${index === 0 && 'mt-4'} mb-2`}
      onPress={() =>
        navigation.navigate(
          item.type === '영입'
            ? CommonScreens.CLUB_POST_DETAIL_SCREEN
            : CommonScreens.MEMBER_POST_DETAIL_SCREEN,
        )
      }>
      <Card className={defaultWrapStyle}>
        <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
          <Avatar type="club" />
        </View>
        <View>
          <View className="mb-1.5 flex-row space-x-1">
            <View
              className={`py-.5 self-start rounded px-1.5 ${
                item.type === '영입' ? 'bg-orange-100' : 'bg-amber-100'
              }`}>
              <Text
                color={item.type === '영입' ? 'text-orange' : 'text-yellow'}
                type="caption"
                weight="semibold">
                {item.type}
              </Text>
            </View>
            <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
              <Text color="text-gray-300" type="caption" weight="semibold">
                {item.gender}
              </Text>
            </View>
          </View>

          <Text weight="bold">{item.title}</Text>
          <Text type="caption" color="text-gray-700">
            {item.user}
          </Text>
        </View>
      </Card>
    </Button>
  );
};

const LeagueClub = ({
  navigation,
}: LeagueTopTabScreenProps<LeagueTopTabScreens.LEAGUE_CLUB>) => {
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

export default LeagueClub;
