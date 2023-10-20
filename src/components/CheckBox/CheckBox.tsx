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
  error?: string | false;
}

const CheckBox = ({checked, error}: CheckBoxProps) => {
  const contexts = useMainContext();

  const checkColor = checked
    ? contexts?.colorScheme === 'dark'
      ? '#fff'
      : '#8143f2'
    : contexts?.colorScheme === 'dark'
    ? '#121212'
    : '#fff';

  // const checkColors = useMemo(() => {
  //   return {
  //     notChecked: '#fff',
  //     checked: contexts?.colorScheme === 'dark' ? '#121212' : '#8143f2',
  //   };
  // }, [contexts?.colorScheme]);

  const borderColor =
    contexts?.colorScheme === 'dark' ? 'border-white' : 'border-gray-600';

  // const progress = useDerivedValue(() => {
  //   return withTiming(checked ? 1 : 0);
  // });

  // const checkBoxStyle = useAnimatedStyle(() => {
  //   const backgroundColor = interpolateColor(
  //     progress.value,
  //     [0, 1],
  //     [Colors.notChecked.background, Colors.checked.background],
  //   );
  //   return {
  //     backgroundColor,
  //   };
  // });

  // const iconColorStyle = useAnimatedStyle(() => {
  //   const color = interpolateColor(
  //     progress.value,
  //     [0, 1],
  //     [checkColors.notChecked, checkColors.checked],
  //   );
  //   return {color};
  // });

  return (
    <Animated.View
      className={`h-5 w-5 items-center justify-center rounded border ${
        error ? 'border-dark-red' : borderColor
      }`}>
      <CheckIcon width={16} height={16} color={checkColor} />
    </Animated.View>
  );
};

export default CheckBox;
