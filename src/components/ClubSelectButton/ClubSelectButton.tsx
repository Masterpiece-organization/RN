import {View} from 'react-native';
import {Avatar, Button, CheckBox, Text} from '@/components';

interface ClubSelectButtonProps {
  club: string;
  selectedTeam: string;
  onPress: (club: string) => void;
}

const ClubSelectButton = ({
  club,
  selectedTeam,
  onPress,
}: ClubSelectButtonProps) => {
  return (
    <Button
      type="outlined"
      variant="split"
      className={`mb-2 ${selectedTeam === club ? 'border-primary' : ''}`}
      onPress={() => onPress(club)}>
      <View className="flex-1 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Avatar type="club" size="small" className="mr-4" />
          <Text
            weight="medium"
            color={selectedTeam === club ? 'text-primary' : ''}>
            {club}
          </Text>
        </View>
        <CheckBox checked={selectedTeam === club} />
      </View>
    </Button>
  );
};

export default ClubSelectButton;
