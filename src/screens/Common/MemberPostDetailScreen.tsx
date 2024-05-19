import {useState, useCallback, useEffect, useRef} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Button,
  BottomSheet,
  BottomSheetContent,
  ClubSelectButton,
  InfoCard,
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

const MemberPostDetailScreen = ({navigation}) => {
  const [clubInfo, setClubInfo] = useState(PROFILE_DATA.MEMBER_POST_PROFILE);
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
      age: '23',
      gender: '남성',
      level: '엘리트',
      location: '서울',
      position: 'ST • CAM • CM',
      foot: '오른발',
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
                color="color-yellow">
                입단신청
              </Text>
              <Text type="header" className="mb-1.5 text-2xl">
                안녕하세요, 30대 남성입니다.
              </Text>
            </View>
            <View className="mb-6 flex-row justify-between rounded-lg bg-gray-50 p-4 dark:bg-black">
              <View className="flex-row items-center">
                <Avatar type="club" size="small" className="mr-4" />
                <Text type="header">맨체스터시티</Text>
              </View>
            </View>
            <Text type="title" className="mb-3">
              클럽 소개
            </Text>
            <Text>
              안녕하세요 저는 대구에서 활동하고 있는 나름 대구를 대표하는
              김이름입니다. ㅋㅋ 제가 그래서 정말 멋진 팀에 들어가고싶은데
              레벨은 엘리트정도로 구하고 있어요. 많은 요청 바랍니다.
              믿어보세요^^
            </Text>
          </View>
          <View className="mt-3 bg-white p-5 dark:bg-gray-950">
            <Text type="title" className="mb-3">
              클럽 정보
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {clubInfo.map(({label, content, icon}) => (
                <View className="flex-1 basis-24" key={label}>
                  <InfoCard label={label} content={content} icon={icon} />
                </View>
              ))}
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

export default MemberPostDetailScreen;
