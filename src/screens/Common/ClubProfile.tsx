import {useState, useEffect} from 'react';
import {View, StatusBar, TouchableOpacity, useColorScheme} from 'react-native';
import {Text, Avatar} from '@/components';
import {StyledLeftIcon} from '@/constants/icons';
import {AnimatedScrollView} from '@kanelloc/react-native-animated-header-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonScreenProps} from '@/types/navigationTypes';
import {PROFILE_DATA} from '@/constants';

interface ApiData {
  [key: string]: string;
}

const Header = ({navigation, top, isScroll}) => {
  return (
    <View style={{marginTop: top}}>
      <StatusBar
        translucent
        // barStyle={isIOS ? 'dark-content' : 'light-content'}
      />
      <View className="w-full flex-row">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="ml-[15px] h-12 w-12 items-start justify-center">
          <StyledLeftIcon
            width={24}
            height={24}
            className={`${isScroll ? 'color-white' : 'color-black'}`}
            // className="color-black dark:color-white"
          />
        </TouchableOpacity>
        <View className="h-12 flex-1 items-center justify-center">
          <Text
            weight="semibold"
            color={`${isScroll ? 'text-white' : 'text-black'}`}>
            테스트
          </Text>
        </View>
        <TouchableOpacity
          // onPress={onPress}
          className="mr-[15px] h-12 w-12 items-end justify-center">
          <Text
            weight="semibold"
            color={`${isScroll ? 'text-white' : 'text-black'}`}>
            수정
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ClubProfile = ({navigation}: CommonScreenProps) => {
  const [clubInfo, setClubInfo] = useState(PROFILE_DATA.CLUB_PROFILE);
  const {top} = useSafeAreaInsets();
  const height = top + 48;

  const colorScheme = useColorScheme();

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
    <View className="flex-1 bg-gray-50 dark:bg-black">
      <AnimatedScrollView
        backgroundColor={colorScheme === 'dark' ? '#16181A' : '#fff'}
        topBarHeight={height}
        TopNavBarComponent={
          <Header navigation={navigation} top={top} isScroll={false} />
        }
        HeaderNavbarComponent={
          <Header navigation={navigation} top={top} isScroll />
        }
        headerImage={require('@/assets/images/test_bg.png')}
        imageStyle={{opacity: 0.7}}>
        <View className="-mt-[178px] pb-20">
          <View>
            <View className="relative mb-9 items-center ">
              <Avatar size="large" type="club" />
            </View>
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
                      <Text
                        type="caption"
                        color="text-gray-700 dark:text-gray-300">
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
                  상관없이 열심히 경기에 참여하는 분들 위주로 클럽이
                  구성되었습니다. 다치지 않고 편하게 같이 축구 하실분들 언제나
                  환영합니다! 안녕하세요, 저희는 서울에서 활동중인 FC서울
                  입니다. 실력과 상관없이 열심히 경기에 참여하는 분들 위주로
                  클럽이 구성되었습니다.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </AnimatedScrollView>
    </View>
  );
};

export default ClubProfile;
