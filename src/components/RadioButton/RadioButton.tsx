import {View, TouchableOpacity} from 'react-native';
import {RadioButtonType} from './RadioButton.types';
import useTheme from '@/hooks/useTheme';

const RadioButton = ({selected, onPress}: RadioButtonType) => {
  const {borderColorTheme} = useTheme();
  const {borderGrey} = borderColorTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`h-5 w-5 items-center justify-center rounded-full border ${
          selected ? 'border-primary' : borderGrey
        }`}>
        {selected ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;
