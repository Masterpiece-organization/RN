import {useEffect} from 'react';
import {HeaderType} from './Header.type';
import {View, Text, useColorScheme, StyleSheet} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import ArrowLeftIcon from '@/assets/icons/nav_arrow_left.svg';
import Animated, {
  Extrapolation,
  interpolate,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useMainContext} from '@/context/MainContext';

import Button from '../Button';

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

  const colorScheme = useColorScheme();

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
    <View className="pt-1 ">
      <View className="px-5 pb-3 flex flex-row items-center justify-between ">
        <View>
          {left && (
            <Button
              label=""
              icon={
                <ArrowLeftIcon
                  color={colorScheme === 'dark' ? 'white' : 'black'}
                  width={28}
                  height={28}
                />
              }
              onPress={() => navigation.goBack()}
              type="text"
              buttonColor=""
            />
          )}
        </View>
        <View>
          <Text>{center}</Text>
        </View>
        <View>{right}</View>
      </View>

      <View
        className={` w-full ${
          border
            ? contexts?.colorScheme === 'dark'
              ? 'border-neutral-600 border-b'
              : 'border-neutral-300 border-b'
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
