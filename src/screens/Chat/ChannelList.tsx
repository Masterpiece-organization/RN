import {View} from 'react-native';
import {Avatar, Button, Text} from '@/components';
import {FlashList} from '@shopify/flash-list';
import {
  ChatScreenProps,
  ChatScreens,
  ChatStackParamList,
  CommonScreenParamList,
} from '@/types/navigationTypes';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const MOCK_DATA = [1, 1, 1];

const Item = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<ChatStackParamList, keyof ChatStackParamList>,
    NativeStackNavigationProp<
      CommonScreenParamList,
      keyof CommonScreenParamList
    >
  >;
}) => {
  return (
    <Button
      type="text"
      variant="custom"
      className="mt-4 flex-row justify-between"
      onPress={() => navigation.navigate(ChatScreens.CHANNEL)}>
      <View className="flex-row">
        <Avatar size="small" className="mr-3" />
        <View>
          <Text weight="semibold">테스트 유저</Text>
          <Text type="caption" color="color-gray-700 dark:color-gray-300">
            안녕하세요 지금은 채팅 테스트중입니다.
          </Text>
        </View>
      </View>
      <View>
        <Text type="caption" color="color-gray-300 dark:color-gray-700">
          8:30 PM
        </Text>
        <View className="mt-1 flex-1 items-end">
          <View className="h-4 w-4 items-center justify-center rounded-full bg-red">
            <Text
              color="color-white"
              type="caption"
              className="text-[10px] leading-4">
              N
            </Text>
          </View>
        </View>
      </View>
    </Button>
  );
};

const ChannelList = ({
  navigation,
}: ChatScreenProps<ChatScreens.CHANNEL_LIST>) => {
  return (
    <FlashList
      data={MOCK_DATA}
      renderItem={props => <Item navigation={navigation} {...props} />}
      keyExtractor={(item, index) => `${item}-${index}`}
      estimatedItemSize={50}
      contentContainerStyle={{
        paddingBottom: 80,
        paddingHorizontal: 20,
      }}
    />
  );
};

export default ChannelList;
