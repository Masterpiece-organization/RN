import {useState, useCallback} from 'react';
import {View} from 'react-native';
import {Button, TitleSection, ClubSelectButton} from '@/components';
import {containerStyle} from '@/theme';
import {
  MatchPostScreens,
  CommonScreens,
  GuestPostScreenProps,
  MatchPostScreenProps,
  GuestPostScreens,
  ClubPostScreens,
  ClubPostScreenProps,
} from '@/types/navigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';

const MOCK_DATA = [{club: '맨체스터시티'}, {club: '레알마드리드'}];

const bodyVariants = {
  match: '팀을 선택하면, 상대방과의 매치를 위한 글을 작성하실 수 있어요.',
  guest: '용병이 필요하신 팀을 선택해주세요.',
  clubPosting: '새로운 팀원이 필요한 팀을 선택해주세요.',
};

type CombineProps = MatchPostScreenProps<CommonScreens.CLUB_SELECTION> &
  GuestPostScreenProps<CommonScreens.CLUB_SELECTION> &
  ClubPostScreenProps<CommonScreens.CLUB_SELECTION>;

const navigationVariants = {
  match: MatchPostScreens.MATCH_TYPE_SELECTION,
  guest: GuestPostScreens.GUEST_MATCH_SELECTION,
  clubPosting: ClubPostScreens.CLUB_DETAIL_INPUTS,
};

const ClubSelection = ({
  navigation,
  route: {
    params: {type},
  },
}: CombineProps) => {
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleSelectTeam = useCallback((team: string) => {
    setSelectedTeam(prev => (prev === team ? '' : team));
  }, []);

  const handleNavigation = () => {
    const screenName = navigationVariants[type] as any;

    return navigation.navigate(screenName);
  };

  return (
    <View className={containerStyle('detail')}>
      <View className="flex-1">
        <TitleSection title="팀을 선택해주세요." body={bodyVariants[type]} />
        {MOCK_DATA.map(({club}) => {
          return (
            <ClubSelectButton
              key={club}
              club={club}
              selectedTeam={selectedTeam}
              onPress={handleSelectTeam}
            />
          );
        })}
      </View>

      <SafeAreaView>
        <Button
          label="다음"
          onPress={handleNavigation}
          disabled={!selectedTeam}
        />
      </SafeAreaView>
    </View>
  );
};

export default ClubSelection;
