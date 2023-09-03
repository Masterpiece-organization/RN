import {useMemo} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {Text} from '@components/index';
import {PositionCheckProps} from './PositionCheck.type';

const PositionCheck = ({checked, text}: PositionCheckProps) => {
  const Colors = useMemo(() => {
    return {
      notChecked: {
        background: '#ffffff50',
      },

      checked: {
        background: '#fff',
      },
    };
  }, []);

  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0);
  });

  const checkBoxStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.3],
      [Colors.notChecked.background, Colors.checked.background],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View
      className="w-14 h-14 rounded-full items-center justify-center"
      style={checkBoxStyle}>
      <Text type="bodySmall" textColor="text-black">
        {text}
      </Text>
    </Animated.View>
  );
};

export default PositionCheck;
