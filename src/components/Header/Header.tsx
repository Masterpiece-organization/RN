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
import useTheme from '@/hooks/useTheme';

const initialOffset = 0;

const Header = ({
  left = true,
  center = undefined,
  right = undefined,
  animatingWidthValues = [0, 0],
  border = false,
  ...props
}: HeaderType & NativeStackHeaderProps) => {
  const {colorScheme} = useMainContext();
  //   const [left, center, right] = children;
  const {
    navigation,
    route: {name},
  } = props;

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

  const {textColorThemes} = useTheme();
  const {dark} = textColorThemes();

  return (
    <View className="pt-1">
      <View className="flex flex-row items-center px-lg pb-3">
        <View className="flex-1 items-start">
          {left && (
            <Button
              label=""
              icon={
                <ArrowLeftIcon
                  color={colorScheme === 'dark' ? 'white' : '#404040'}
                  width={24}
                  height={24}
                />
              }
              onPress={() => {
                name === 'Terms'
                  ? navigation.navigate('Login')
                  : navigation.goBack();
              }}
              type="text"
              buttonColor=""
              className="-ml-2 pr-2"
            />
          )}
        </View>
        <View className="mt-0.5 h-7 shrink-0 items-center justify-center">
          <Text
            className={`${dark} mt-0.5 flex-1 text-center`}
            type="subtitleSmall">
            {center}
          </Text>
        </View>
        <View className="flex-1 items-end">{right}</View>
      </View>

      <View
        className={`w-full ${
          border
            ? colorScheme === 'dark'
              ? 'border-b border-gray-800'
              : 'border-b border-gray-400'
            : ''
        }`}>
        <Animated.View
          className={`absolute border-b-2 ${border && 'border-primary'} `}
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
