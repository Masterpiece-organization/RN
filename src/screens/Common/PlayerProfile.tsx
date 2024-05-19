/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {Avatar, ClubList, Text} from '@/components';
import {CommonScreenProps, CommonScreens} from '@/types/navigationTypes';
import {PROFILE_DATA} from '@/constants';

interface ApiData {
  [key: string]: string;
}

const PlayerProfile = ({navigation}: CommonScreenProps) => {
  const [playerInfo, setPlayerInfo] = useState(PROFILE_DATA.PLAYER_PROFILE);

  useEffect(() => {
    const mockApiData: ApiData = {
      age: '24살',
      gender: '남자',
      level: '프로',
      location: '부산',
      position: 'CF • LW • RW',
      foot: '왼발',
    };
    const updatedPlayerInfo = playerInfo.map(info => ({
      ...info,
      content: mockApiData[info.type] || info.content,
    }));

    setPlayerInfo(updatedPlayerInfo);
  }, []);

  return (
    <ScrollView
      className="bg-gray-50 pb-14 dark:bg-black"
      contentContainerStyle={{paddingBottom: 160}}>
      <View>
        <View className="mb-9 mt-4 items-center">
          <Avatar size="large" />
        </View>
        <View className="mb-3 max-h-[280px] bg-white p-5 dark:bg-gray-950">
          <Text type="title" className="mb-3">
            선수 정보
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {playerInfo.map(({label, content, icon}) => (
              <View
                className="relative h-24 flex-1 basis-24 rounded-lg bg-gray-50 p-3 dark:bg-gray-950"
                key={label}>
                <View>
                  <Text type="caption" color="text-gray-700 dark:text-gray-300">
                    {label}
                  </Text>
                  <Text weight="semibold">{content}</Text>
                </View>
                <View className="absolute bottom-2.5 right-2.5 items-end">
                  {icon}
                </View>
              </View>
            ))}
          </View>
        </View>
        <View className="bg-white p-5 dark:bg-gray-950">
          <Text type="title" className="mb-3">
            소속 클럽
          </Text>
          <View className="space-y-3">
            <ClubList
              name="맨체스터시티"
              onPress={() =>
                navigation.navigate(CommonScreens.CLUB_PROFILE, {
                  name: 'test',
                  id: 1,
                })
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlayerProfile;
