import {useRef} from 'react';
import {Animated, View} from 'react-native';
import {Avatar, Button, Text} from '@/components';
import {useScrollStore} from '@/stores/store';
import {AnimatedFlashList} from '@shopify/flash-list';

const MOCK_DATA = [
  {
    type: 'header',
    body1: '이름',
    body2: '포지션',
  },
  {
    type: 'captain',
    position: 'ST',
    user: '테스트',
  },
  {
    type: 'user',
    position: 'CF',
    user: '테스트',
  },
  {
    type: 'user',
    position: 'CAM',
    user: '테스트',
  },
  {
    type: 'user',
    position: 'CM',
    user: '테스트',
  },
  {
    type: 'user',
    position: 'CB',
    user: '테스트',
  },
  {
    type: 'user',
    position: 'RB',
    user: '테스트',
  },
  {
    type: 'user',
    position: 'GK',
    user: '테스트',
  },
];

const stickyHeaderIndices = MOCK_DATA.map((item, index) => {
  if (item.type === 'header') {
    return index;
  } else {
    return null;
  }
}).filter(item => item !== null) as number[];

const renderItem = ({item}, navigation) => {
  return (
    <Button type="text" variant="custom" className="mb-2 px-5">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Avatar className="mr-4" size="small" />
          <Text color="text-gray-900 dark:text-white">{item.user}</Text>
        </View>
        <View className="">
          <Text color="text-gray-300 dark:text-gray-600">{item.position}</Text>
        </View>
      </View>
    </Button>
  );
};

const ClubSquad = ({navigation}) => {
  const {scrollY} = useScrollStore();

  const AnimatedScrollY = useRef(scrollY).current;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: AnimatedScrollY}}}],
    {
      useNativeDriver: true,
    },
  );

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <AnimatedFlashList
        data={MOCK_DATA}
        // renderItem={(props) => renderItem(props, navigation)}
        renderItem={({item}) => {
          if (item.type === 'header') {
            // Rendering header
            return (
              <View className="mb-4 flex-row justify-between border-b border-b-gray-50 bg-white pb-4 pl-[76px] pr-5 dark:border-b-gray-800 dark:bg-black">
                <Text type="caption" color="color-gray-300 dark:color-gray-600">
                  {item.body1}
                </Text>
                <Text type="caption" color="color-gray-300 dark:color-gray-600">
                  {item.body2}
                </Text>
              </View>
            );
          } else {
            // Render item
            return renderItem({item}, navigation);
          }
        }}
        stickyHeaderIndices={stickyHeaderIndices}
        estimatedItemSize={60}
        keyExtractor={(item, index) => item.type + index}
        onScroll={onScroll}
        contentContainerStyle={{
          paddingBottom: 420,
        }}
      />
    </View>
  );
};

export default ClubSquad;
