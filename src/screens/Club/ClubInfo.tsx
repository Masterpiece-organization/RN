import {useState, useEffect, useRef} from 'react';
import {View, useColorScheme, Animated} from 'react-native';
import {Text} from '@/components';
import {PROFILE_DATA} from '@/constants';
import {useScrollStore} from '@/stores/store';

interface ApiData {
  [key: string]: string;
}

const ClubInfo = ({navigation}) => {
  const [clubInfo, setClubInfo] = useState(PROFILE_DATA.CLUB_PROFILE);

  const colorScheme = useColorScheme();

  const {scrollY} = useScrollStore();

  const AnimatedScrollY = useRef(scrollY).current;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: AnimatedScrollY}}}],
    {
      useNativeDriver: true,
    },
  );

  useEffect(() => {
    const mockApiData: ApiData = {
      age: '24살',
      gender: '남자',
      level: '엘리트',
      location: '부산',
      team_size: '23명',
      fee: '10,000',
      uniform: '검은색',
      club_date: '2023년 10월 12일',
    };
    const updatedClubInfo = clubInfo.map(info => ({
      ...info,
      content: mockApiData[info.type] || info.content,
    }));

    setClubInfo(updatedClubInfo);
  }, []);

  return (
    <Animated.ScrollView
      className="flex-1 bg-gray-50 dark:bg-black"
      onScroll={onScroll}
      contentContainerStyle={{
        paddingBottom: 420,
      }}>
      <View className="">
        <View className="mb-3 bg-white p-5 dark:bg-gray-950">
          <Text type="title" className="mb-3">
            클럽 정보
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {clubInfo.map(({label, content, icon}) => (
              <View
                key={label}
                className="relative h-24 flex-1 basis-24 rounded-lg bg-gray-50 p-3 dark:bg-black">
                <View>
                  <Text type="caption" color="text-gray-700 dark:text-gray-300">
                    {label}
                  </Text>
                  <View className="flex-row items-center">
                    <Text weight="semibold">{content}</Text>
                    {label === '회비' && <Text type="caption">원</Text>}
                  </View>
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
            클럽 소개
          </Text>
          <View>
            <Text>
              안녕하세요, 저희는 서울에서 활동중인 FC서울 입니다. 실력과
              상관없이 열심히 경기에 참여하는 분들 위주로 클럽이 구성되었습니다.
              다치지 않고 편하게 같이 축구 하실분들 언제나 환영합니다!
              안녕하세요, 저희는 서울에서 활동중인 FC서울 입니다. 실력과
              상관없이 열심히 경기에 참여하는 분들 위주로 클럽이 구성되었습니다.
            </Text>
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default ClubInfo;
