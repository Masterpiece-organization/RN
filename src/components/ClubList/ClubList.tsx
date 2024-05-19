import {View} from 'react-native';
import {Avatar, Button, Text} from '@/components';

interface ClubListProps {
  onPress?: () => void;
  img?: string;
  name: string;
  history?: string;
}

const ClubList = ({onPress, img, name, history}: ClubListProps) => {
  return (
    <View className={`${history && 'flex-row items-center justify-between'}`}>
      <Button type="text" variant="custom" onPress={onPress}>
        <View className="flex-row items-center">
          <Avatar className="mr-4" size="small" type="club" />
          <Text color="text-gray-900 dark:text-white">{name}</Text>
        </View>
      </Button>
      {history && (
        <Text color="text-gray-600 dark:text-gray-300">{history}</Text>
      )}
    </View>
  );
};

export default ClubList;
