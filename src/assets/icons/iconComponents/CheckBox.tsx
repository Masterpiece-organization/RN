import * as React from 'react';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Svg, Path} from 'react-native-svg';

interface CheckIconProps {
  animatedStroke: Animated.SharedValue<string>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CheckIcon = ({animatedStroke}: CheckIconProps) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      stroke: animatedStroke.value,
    };
  });

  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <AnimatedPath
        d="M5 13l4 4L19 7"
        animatedProps={animatedProps}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CheckIcon;
