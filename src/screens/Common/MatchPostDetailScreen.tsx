import {useState, useCallback, useEffect, useRef} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Button,
  BottomSheet,
  BottomSheetContent,
  ClubSelectButton,
  Text,
} from '@/components';
import {StyledMarkerIcon, StyledMenuIcon} from '@/constants/icons';
import {PROFILE_DATA} from '@/constants';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonScreens} from '@/types/navigationTypes';
import useBottomSheet from '@/hooks/useBottomSheet';

const MOCK_DATA = [{club: '맨체스터시티'}, {club: '레알마드리드'}];

interface ApiData {
  [key: string]: string;
}

const renderBottomContent = (type?: string, item, selectedTeam, onPress) => {
  return type === 'menu' ? (
    <View className="px-5">
      <TouchableOpacity className="mb-4 flex-row items-center">
        <Text
          weight="medium"
          className="text-lg"
          color="text-gray-700 dark:text-white">
          게시글 수정
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center">
        <Text color="color-red" weight="medium" className="text-lg">
          삭제
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View className="px-5">
      <Text type="display" className="mb-5 text-xl">
        팀 선택
      </Text>
      <View>
        {item.map(({club}: {club: string}) => (
          <ClubSelectButton
            key={club}
            club={club}
            onPress={() => onPress(club)}
            selectedTeam={selectedTeam}
          />
        ))}
      </View>
    </View>
  );
};

const MatchPostDetailScreen = ({navigation}) => {
  // const {isOpen, open} = useBottomSheetStore();
  const [clubInfo, setClubInfo] = useState(PROFILE_DATA.MATCH_POST_PROFILE);
  const [bottomSheetType, setBottomSheetType] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const {bottomSheetRef, open} = useBottomSheet();

  const handlePresentModalPress = useCallback(type => {
    setBottomSheetType(type);
    open();
  }, []);

  const handleSelectTeam = useCallback((team: string) => {
    setSelectedTeam(prev => (prev === team ? '' : team));
  }, []);

  const renderHeaderRight = useCallback(
    () => (
      <TouchableOpacity
        className="mr-5 h-12 w-12 items-end justify-center"
        onPress={() => handlePresentModalPress('menu')}>
        <StyledMenuIcon className="color-gray-100" />
      </TouchableOpacity>
    ),
    [],
  );

  const item = useCallback(() => {
    return renderBottomContent(
      bottomSheetType,
      MOCK_DATA,
      selectedTeam,
      handleSelectTeam,
    );
  }, [bottomSheetType]);

  useEffect(() => {
    const mockApiData: ApiData = {
      gender: '남자',
      level: '엘리트',
      team_size: '11 vs 11',
      match_fee: '10,000',
    };
    const updatedClubInfo = clubInfo.map(info => ({
      ...info,
      content: mockApiData[info.type] || info.content,
    }));

    setClubInfo(updatedClubInfo);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent>{item()}</BottomSheetContent>
      </BottomSheet>
      <ScrollView className="bg-gray-50 pb-14 dark:bg-black">
        <View>
          <View className="bg-white p-5 dark:bg-gray-950">
            <View className="mb-5">
              <Text
                type="display"
                className="mb-2 text-base"
                color="color-blue">
                일반매치
              </Text>
              <Text type="header" className="mb-1.5 text-2xl">
                10월 10일 화요일 14:00 - 17:00
              </Text>
              <View className="flex-row items-center">
                <View className="mr-5 flex-row items-center">
                  <StyledMarkerIcon className="color-primary mr-2" />
                  <Text color="text-gray-700 dark:text-gray-300">
                    서울 서초구 방배동 1000-1000
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(CommonScreens.MAP_SCREEN, {
                      type: 'detail',
                    })
                  }>
                  <Text type="caption" color="text-blue">
                    지도보기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="mb-6 flex-row justify-between rounded-lg bg-gray-50 p-4 dark:bg-black">
              {/* <View>
              <Avatar type="club" size="small" className="mb-3" />
              <Text type="header">맨체스터시티</Text>
            </View>
            <Text color="text-primary">Home</Text> */}
              <View className="flex-row items-center">
                <Avatar type="club" size="small" className="mr-4" />
                <Text type="header">맨체스터시티</Text>
              </View>
            </View>
            <Text type="title" className="mb-3">
              경기 소개
            </Text>
            <Text>
              경기 초청합니다. 10월 10일 화요일 오후 2~5시 구장비는 1만원이며
              한두번 경기해보고 정기적으로 매치 하실팀도 환영입니다. 저희들은
              순수 아마추어 팀이고 실력이 낮아서 선출팀은 죄송합니다.
            </Text>
          </View>
          <View className="mt-3 bg-white p-5 dark:bg-gray-950">
            <Text type="title" className="mb-3">
              경기 정보
            </Text>
            <View className="flex-row gap-2">
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
          <View className="mt-3 bg-white p-5 dark:bg-gray-950">
            <Text type="title" className="mb-3">
              경기 장소
            </Text>
            <View className="h-44">
              <Button
                type="text"
                variant="custom"
                className="flex-1"
                onPress={() =>
                  navigation.navigate(CommonScreens.MAP_SCREEN, {
                    type: 'detail',
                  })
                }>
                <MapView
                  scrollEnabled={false}
                  style={{flex: 1, borderRadius: 8}}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={{
                    latitude: 37.4967,
                    longitude: 127.063,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.0025,
                  }}
                />
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView>
        <View className="flex-1">
          <Button
            label="경기신청 하기"
            onPress={() => handlePresentModalPress('club')}
            className="absolute bottom-0 left-5 right-5"
            float
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default MatchPostDetailScreen;

{
  /* {renderBottomContent(
            bottomSheetType,
            MOCK_DATA,
            selectedTeam,
            handleSelectTeam,
          )} */
}
