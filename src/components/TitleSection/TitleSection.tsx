import {View} from 'react-native';
import Text from '../Text';

export interface TitleSectionProps {
  title?: string;
  body?: string;
  color?: string;
  className?: string;
}

const TitleSection = ({title, body, color, className}: TitleSectionProps) => {
  return (
    <View className={className}>
      {title && (
        <Text className="mb-1" type="display" color={color}>
          {title}
        </Text>
      )}
      {body && (
        <Text className="mb-6" type="title" color={color}>
          {body}
        </Text>
      )}
    </View>
  );
};

export default TitleSection;
