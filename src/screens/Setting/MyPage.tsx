import {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Avatar, Button, Card, ClubList, Text} from '@/components';
import {
  SettingScreenProps,
  SettingScreens,
  CommonScreens,
} from '@/types/navigationTypes';
import {StyledRightIcon} from '@/constants/icons';
import {containerStyle, cardBackground} from '@/theme';

const MyPage = ({navigation}: SettingScreenProps<SettingScreens.MY_PAGE>) => {
  // useEffect(() => {
  //   const parent = navigation.getParent();

  //   console.log(parent);
  //   // 화면에 진입할 때 탭 바를 보이도록 설정
  //   parent.setOptions({tabBarStyle: {display: 'flex'}});

  //   // Cleanup 함수에서는 화면을 벗어날 때 탭 바를 다시 숨깁니다.
  //   // 이 부분은 화면에서 벗어날 때만 탭 바를 숨기고 싶은 경우에만 추가합니다.
  //   // 모든 스크린에서 탭 바를 보여주고 싶다면, 이 부분은 생략하세요.
  //   return () => {
  //     parent.setOptions({tabBarStyle: {display: 'none'}});
  //   };
  // }, [navigation]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      // tabBarStyle: {
      //   display: 'none',
      // },
      // tabBarStyle: undefined,
    });
    return () =>
      navigation.getParent()?.setOptions({
        // tabBarStyle: undefined,
        // tabBarStyle: {
        //   display: 'none',
        // },
      });
  }, [navigation]);

  return (
    <View className={`${containerStyle('card')} ${cardBackground}`}>
      <Button
        type="text"
        variant="custom"
        onPress={() =>
          navigation.navigate(CommonScreens.PLAYER_PROFILE, {
            name: 'test',
            id: 1,
          })
        }>
        <Card className="mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Avatar className="mr-4" />
            <View>
              <Text weight="semibold">축구왕찐천재</Text>
              <Text color="text-gray-300">ST • CAM • CM</Text>
            </View>
          </View>

          <StyledRightIcon width={16} height={16} className="color-gray-200" />
        </Card>
      </Button>
      <Card size="medium" className="mb-3">
        <View className="mb-4 flex-row justify-between">
          <Text type="title">경기이력</Text>
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => navigation.navigate(SettingScreens.MATCH_HISTORY)}>
            <Text type="caption" color="text-gray-300">
              더보기
            </Text>
          </TouchableOpacity>
        </View>
        <ClubList
          name="맨체스터시티"
          history="32"
          onPress={() =>
            navigation.navigate(CommonScreens.CLUB_PROFILE, {
              name: 'test',
              id: 1,
            })
          }
        />
      </Card>
      <Card>
        <Button
          type="text"
          variant="custom"
          className="flex-row items-center justify-between"
          onPress={() =>
            navigation.navigate(SettingScreens.UPLOADED_POST, {id: 1})
          }>
          <Text>업로드한 게시물</Text>
          <StyledRightIcon width={16} height={16} className="color-gray-200" />
        </Button>
      </Card>
    </View>
  );
};

export default MyPage;
