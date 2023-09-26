import {useEffect} from 'react';
import {HeaderType} from './Header.type';
import {View, StyleSheet} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import ArrowLeftIcon from '@/assets/icons/nav_arrow_left.svg';
import Animated, {
  Extrapolation,
  interpolate,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useMainContext} from '@/contexts/MainContext';
import {Text, Button} from '@components/index';

const initialOffset = 0;

const Header = ({
  left = true,
  center = undefined,
  right = undefined,
  animatingWidthValues = [0, 0],
  border = false,
  ...props
}: HeaderType & NativeStackHeaderProps) => {
  const contexts = useMainContext();
  //   const [left, center, right] = children;
  const {navigation} = props;

  const offset = useSharedValue(initialOffset);

  const animatedStyles = useAnimatedStyle(() => {
    const width = interpolate(
      offset.value,
      [0, 1],
      [animatingWidthValues[0], animatingWidthValues[1]],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      width: width,
    };
  });

  useEffect(() => {
    offset.value = withSpring(1, {
      mass: 3.7,
      damping: 40,
      stiffness: 120,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="pt-1">
      <View className="flex flex-row items-center px-5 pb-3">
        <View className="flex-1 items-start">
          {left && (
            <Button
              label=""
              icon={
                <ArrowLeftIcon
                  color={contexts?.colorScheme === 'dark' ? 'white' : 'black'}
                  width={28}
                  height={28}
                />
              }
              onPress={() => navigation.goBack()}
              type="text"
              buttonColor=""
              className="-ml-2 pr-2"
            />
          )}
        </View>
        <View className="mt-0.5 shrink-0 items-center justify-center">
          <Text
            className={`${
              contexts?.colorScheme === 'dark' ? 'text-white' : 'text-black'
            } flex-1 text-center`}>
            {center}
          </Text>
        </View>
        <View className="flex-1 items-end">{right}</View>
      </View>

      <View
        className={`w-full ${
          border
            ? contexts?.colorScheme === 'dark'
              ? 'border-b border-neutral-600'
              : 'border-b border-neutral-300'
            : ''
        }`}>
        <Animated.View
          className={`absolute border-b-2 ${
            border &&
            (contexts?.colorScheme === 'dark' ? 'border-white' : 'border-black')
          } `}
          style={[animatedStyles, styles.animatingBorder]}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  animatingBorder: {top: -1},
});
