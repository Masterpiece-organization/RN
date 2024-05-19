import {useMemo} from 'react';
import {useColorScheme} from 'react-native';
import CheckIcon from '@/assets/icons/iconComponents/CheckBox';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

export const CHECKBOX_TYPES = ['filled', 'solid'] as const;

export type CheckBoxType = (typeof CHECKBOX_TYPES)[number];

export interface CheckBoxProps {
  type?: CheckBoxType;
  checked: Boolean;
}

const defaultCheckBoxStyle =
  'h-6 w-6 items-center justify-center rounded-full border-0';

const CheckBox = ({type = 'filled', checked}: CheckBoxProps) => {
  const colorScheme = useColorScheme();

  const Colors = useMemo(() => {
    return {
      notChecked: {
        backgroundColor: colorScheme === 'light' ? '#DEE0E2' : '#3E4042',
        color: '#B6B8BA',
      },

      checked: {
        backgroundColor: '#3D9BFF',
        color: '#fff',
      },
    };
  }, []);

  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0, {
      duration: 200,
    });
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.notChecked.backgroundColor, Colors.checked.backgroundColor],
    );

    return {
      backgroundColor,
      borderWidth: 2,
      borderRadius: 9999,
    };
  });

  const filledStrokeColor = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 1],
      [Colors.notChecked.color, Colors.checked.color],
    );
  });

  const solidStrokeColor = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 1],
      [Colors.notChecked.color, Colors.checked.backgroundColor],
    );
  });

  return (
    <Animated.View
      className={defaultCheckBoxStyle}
      style={type === 'filled' ? backgroundStyle : null}>
      <CheckIcon
        animatedStroke={
          type === 'filled' ? filledStrokeColor : solidStrokeColor
        }
      />
    </Animated.View>
  );
};

export default CheckBox;
