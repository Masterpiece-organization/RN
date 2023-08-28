import {useMemo} from 'react';
import CheckIcon from '@/assets/icons/check.svg';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useMainContext} from '@/contexts/MainContext';

interface CheckBoxProps {
  checked: Boolean;
}

const CheckBox = ({checked}: CheckBoxProps) => {
  const contexts = useMainContext();

  const Colors = useMemo(() => {
    return {
      notChecked: {
        background: contexts?.colorScheme === 'dark' ? '#404040' : '#E5E5E5',
      },

      checked: {
        background: contexts?.colorScheme === 'dark' ? '#E5E5E5' : '#222',
      },
    };
  }, [contexts?.colorScheme]);

  const checkColor = checked
    ? contexts?.colorScheme === 'dark'
      ? '#222'
      : '#fff'
    : '#9ca3af';

  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0);
  });

  const checkBoxStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.notChecked.background, Colors.checked.background],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View
      className="w-5 h-5 rounded-md items-center justify-center"
      style={checkBoxStyle}>
      <CheckIcon width={16} height={16} color={checkColor} />
    </Animated.View>
  );
};

export default CheckBox;
