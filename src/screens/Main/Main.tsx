import {
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  MatchList,
  Tag,
  CarouselComponent,
  Card,
  Avatar,
} from '@/components';
import {useState} from 'react';
import {CommonScreens} from '@/types/navigationTypes';
import {MainScreenProps, MainScreens} from '@/types/navigationTypes';
import {IMGS} from '@/constants';
import {StyledNotificationIcon, StyledRightIcon} from '@/constants/icons';
import {SafeAreaView} from 'react-native-safe-area-context';

const buttonItems = [
  {
    icon: IMGS.cupIcon,
    title: '경기 모집',
    navigationTo: MainScreens.MATCH_POST_STACK,
  },
  {
    icon: IMGS.userOctagonIcon,
    title: '용병 모집',
    navigationTo: MainScreens.GUEST_POST_STACK,
  },
  {
    icon: IMGS.searchIcon,
    title: '팀원 모집',
    navigationTo: MainScreens.CLUB_POST_STACK,
  },
  {
    icon: IMGS.userCardIcon,
    title: '입단 신청',
    navigationTo: MainScreens.MEMBER_POST_STACK,
  },
];

const Header = ({navigation}) => {
  return (
    <View
      className="sticky inset-0 z-10
    w-full flex-row justify-between bg-gray-50 dark:bg-black">
      <View className="justify-center">
        <Text type="display" className="ml-[15px]">
          로고
        </Text>
      </View>

      <TouchableOpacity
        className="mr-[18px] h-12 w-12 items-end justify-center"
        onPress={() => navigation.navigate(MainScreens.NOTIFICATION)}>
        <StyledNotificationIcon className="color-gray-100 dark:color-gray-100" />
      </TouchableOpacity>
    </View>
  );
};

const Main = ({navigation}: MainScreenProps<MainScreens.MAIN>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasJoinedClub, setHasJoinedClub] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black">
      <StatusBar translucent />
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{paddingBottom: 80}}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}>
        <Header navigation={navigation} />
        {/* Banner */}
        <View className="pt-4">
          <CarouselComponent
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </View>
        <View className="mx-[15px]">
          <View className="mt-10">
            <View className="mb-2">
              <Text type="title">둘러보기</Text>
            </View>
            <View className="flex-row flex-wrap gap-3">
              {buttonItems.map(({icon, title, navigationTo}) => (
                <View className="h-[76px] flex-1 basis-40" key={title}>
                  <Button
                    type="text"
                    variant="custom"
                    onPress={() => navigation.navigate(navigationTo)}
                    key={title}
                    className="rounded-lg bg-white p-4 active:bg-gray-100 dark:bg-gray-950 dark:active:bg-gray-700">
                    <View className="flex-row items-center">
                      <View className="mr-4">
                        <Image source={icon} className="h-9 w-9" />
                      </View>
                      <View>
                        <Text weight="bold">{title}</Text>
                        <Text color="text-gray-700 dark:text-gray-200">
                          글 작성하기
                        </Text>
                      </View>
                    </View>
                  </Button>
                </View>
              ))}
            </View>
          </View>
          <Card className="mt-3">
            <View className="mb-14">
              <Text type="header" className="mb-1">
                {hasJoinedClub
                  ? '아직 경기 일정이 없으신가요?'
                  : '아직 속하신 클럽이 없으신가요?'}
              </Text>
              <Text>
                {hasJoinedClub
                  ? '우리그의 흥미로운 경기를 선택해 뛰어보세요!'
                  : '새로운 클럽을 찾아 우리그팀원들과 경기를 뛰어보세요!'}
              </Text>
            </View>
            <Button label="경기잡기" />
          </Card>
          <View className="mt-6">
            <View className="mb-2">
              <Text type="title">내가 가입한 클럽</Text>
            </View>
            <Card className="h-48 w-48 justify-between rounded-3xl p-5">
              <View>
                <View className="mb-4">
                  <Avatar type="club" size="small" />
                </View>
                <Text weight="bold">맨체스터시티 주니어</Text>
              </View>
              <View className="flex-row items-end justify-between">
                <View>
                  <Text type="caption" weight="semibold">
                    창단일
                  </Text>
                  <Text type="caption" color="text-gray-300">
                    2023년 1월 23일
                  </Text>
                </View>
                <View className="h-6 w-6 items-center justify-center rounded-full bg-gray-950">
                  <StyledRightIcon
                    width={16}
                    height={16}
                    className="color-white"
                  />
                </View>
              </View>
            </Card>
          </View>

          <View className="mt-6">
            <View className="flex-row items-center justify-between">
              <Text type="title">경기일정</Text>
              <Button
                textType="caption"
                label="더보기"
                type="text"
                labelColor="text-gray-300"
                onPress={() =>
                  navigation.navigate(CommonScreens.MATCH_SCHEDULE, {type: ''})
                }
              />
            </View>
            <Button type="text" variant="custom">
              <Card className="flex-row">
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-rose-100 px-1.5">
                      <Text color="text-red" type="caption" weight="semibold">
                        경기임박
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-100 px-1.5">
                      <Text color="text-black" type="caption" weight="semibold">
                        자체
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남 11vs11
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">10월 10일 화요일 14:00 - 17:00</Text>
                  <Text type="caption" color="text-gray-700 dark:text-gray-200">
                    서울 서초구 방배동 1000-1234
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
