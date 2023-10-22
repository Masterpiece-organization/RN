import {useMemo} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {PositionCheckProps} from './PositionCheck.type';

const PositionCheck = ({checked, text}: PositionCheckProps) => {
  const Colors = useMemo(() => {
    return {
      notChecked: {
        background: '#ffffff40',
        borderColor: '#ffffff40',
        color: '#000',
        fontWeight: '500',
      },

      checked: {
        background: '#fff',
        borderColor: '#d7c6f5',
        color: '#7230e3',
        fontWeight: '800',
      },
    };
  }, []);

  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0);
  });

  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 0.3],
      [Colors.notChecked.color, Colors.checked.color],
    );

    const fontWeight =
      progress.value > 0.3 ? ('800' as const) : ('500' as const);

    return {
      color,
      fontWeight,
      fontFamily: 'GmarketSansMedium',
      fontSize: 10,
    };
  });

  const combinedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.notChecked.background, Colors.checked.background],
    );

    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.notChecked.borderColor, Colors.checked.borderColor],
    );

    return {
      backgroundColor,
      borderColor,
      borderWidth: 1,
      borderRadius: 9999,
    };
  });

  return (
    <Animated.View
      className="h-11 w-11 items-center justify-center rounded-full border"
      style={combinedStyle}>
      <Animated.Text style={textStyle}>{text}</Animated.Text>
    </Animated.View>
  );
};

export default PositionCheck;
