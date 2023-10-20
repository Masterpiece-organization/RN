import {View} from 'react-native';
import Text from '../Text';
import {TitleSectionPropsType} from './TitleSEction.type';
const TitleSection = ({title, body}: TitleSectionPropsType) => {
  return (
    <View>
      <Text className="mb-base" type="title">
        {title}
      </Text>
      <Text className="mb-md" type="subtitle">
        {body}
      </Text>
    </View>
  );
};

export default TitleSection;
