import {View, Image, Pressable} from 'react-native';
import {Text, Avatar} from '@/components';
import {FlashList} from '@shopify/flash-list';
import {SettingScreenProps, SettingScreens} from '@/types/navigationTypes';

const test = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1,
];

const MatchHistory = ({
  navigation,
}: SettingScreenProps<SettingScreens.MATCH_HISTORY>) => {
  return (
    <View className="flex-1">
      <View className="mx-5 my-4 flex-row justify-between">
        <Text type="caption" color="text-gray-700 dark:text-gray-200">
          클럽이름
        </Text>
        <Text type="caption" color="text-gray-700 dark:text-gray-200">
          경기수
        </Text>
      </View>
      <View>
        <View className="h-full">
          <FlashList
            data={test}
            renderItem={() => (
              <View className="mb-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Avatar className="mr-4" size="small" type="club" />
                  <Text color="text-gray-900 dark:text-white">
                    맨체스터시티
                  </Text>
                </View>
                <Text color="text-gray-600 dark:text-gray-300">32</Text>
              </View>
            )}
            estimatedItemSize={200}
            contentContainerStyle={{
              paddingBottom: 160,
              paddingHorizontal: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MatchHistory;
