import {useMemo} from 'react';
import CheckIcon from '@/assets/icons/iconComponents/CheckBox';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useMainContext} from '@/contexts/MainContext';

interface CheckBoxProps {
  checked: Boolean;
  error?: boolean;
}

const CheckBox = ({checked, error}: CheckBoxProps) => {
  const contexts = useMainContext();

  const Colors = useMemo(() => {
    return {
      notChecked: {
        borderColor: contexts?.colorScheme === 'dark' ? '#fff' : '#404040',
        color: contexts?.colorScheme === 'dark' ? '#121212' : '#fff',
      },

      checked: {
        borderColor: contexts?.colorScheme === 'dark' ? '#fff' : '#8143f2',
        color: contexts?.colorScheme === 'dark' ? '#fff' : '#8143f2',
      },
    };
  }, [contexts?.colorScheme]);

  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0);
  });

  const borderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.notChecked.borderColor, Colors.checked.borderColor],
    );

    return {
      borderColor,
      borderWidth: 2,
      borderRadius: 9999,
    };
  });

  const animatedStrokeColor = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 1],
      [Colors.notChecked.color, Colors.checked.color], // 예시 색상입니다; 실제 색상 값으로 교체해야 합니다.
    );
  });

  return (
    <Animated.View
      className={`h-5 w-5 items-center justify-center rounded border ${
        error && 'border-dark-red'
      }`}
      style={borderStyle}>
      <CheckIcon animatedStroke={animatedStrokeColor} />
    </Animated.View>
  );
};

export default CheckBox;
