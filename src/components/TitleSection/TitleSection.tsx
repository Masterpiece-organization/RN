import {View} from 'react-native';
import Text from '../Text';
import {TitleSectionPropsType} from './TitleSEction.type';
const TitleSection = ({title, body}: TitleSectionPropsType) => {
  return (
    <View className="justify-center pt-8">
      <Text className="mb-2" type="title">
        {title}
      </Text>
      <Text>{body}</Text>
    </View>
  );
};

export default TitleSection;
