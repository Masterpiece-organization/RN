import {View} from 'react-native';
import {Button, Text} from '@/components';

interface SelectButtonProps {
  type: string;
  label: string;
  selectedOption?: string;
  item: string[];
  buttonWidth?: number;
  onPress: (type: string, option: string) => void;
}

const SelectButton = ({
  type,
  label,
  selectedOption,
  item,
  buttonWidth,
  onPress,
}: SelectButtonProps) => {
  return (
    <View className="mb-7">
      <Text color="text-gray-700 dark:text-gray-300" className="mb-2">
        {label}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {item.map(itemLabel => (
          <View
            style={{width: buttonWidth}}
            className={`${buttonWidth ?? 'flex-1'}`}
            key={itemLabel}>
            <Button
              type="outlined"
              label={itemLabel}
              labelColor={
                selectedOption === itemLabel ? 'text-primary' : 'text-gray-200'
              }
              className={`${
                selectedOption === itemLabel ? 'border-primary' : ''
              }`}
              onPress={() => onPress(type, itemLabel)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SelectButton;
