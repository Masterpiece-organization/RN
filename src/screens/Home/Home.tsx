import {useEffect, useState} from 'react';
import {View, SafeAreaView, Dimensions} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {Text, Button} from '@/components';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: HomeScreenProps) => {
  const {height} = Dimensions.get('window');

  const textTranslateY = useSharedValue(height / 4);
  const buttonOpacity = useSharedValue(0);
  const imageScale = useSharedValue(1.5);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: textTranslateY.value}],
    };
  });

  const contentsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
      transform: [{translateY: textTranslateY.value}],
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: imageScale.value}],
    };
  });

  const [blurRadius, setBlurRadius] = useState(10);

  const [isImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isImageLoaded) {
      textTranslateY.value = withTiming(0, {
        duration: 1000,
        easing: Easing.ease,
      });
      buttonOpacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.ease,
      });
      imageScale.value = withTiming(1, {duration: 1000, easing: Easing.ease});
      const interval = setInterval(() => {
        setBlurRadius(prev => prev - 0.5);
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isImageLoaded]);

  return (
    <View className="flex-1 justify-between">
      <SafeAreaView className="mx-lg  mt-xxl">
        <Animated.View style={textAnimatedStyle}>
          <Text
            className="mb-base font-titleBold"
            textColor="text-white"
            type="title">
            축구로 하나가 되는{'\n'}우리들만의 리그
          </Text>
        </Animated.View>
        <Animated.View style={contentsAnimatedStyle}>
          <Text type="subtitle" textColor="text-white">
            지금 바로 가입하거나 로그인하여 즐거운{'\n'}축구 경험을 시작하세요!
          </Text>
        </Animated.View>
      </SafeAreaView>

      <SafeAreaView className="mx-lg">
        <Animated.View style={contentsAnimatedStyle}>
          <View className="mb-lg">
            <Button
              label="로그인"
              onPress={() => navigation.navigate('Login')}
              buttonColor="bg-primary"
              className="mb-xs"
            />
            <Button
              label="회원가입"
              onPress={() => navigation.navigate('Terms')}
              textColor="text-black"
              buttonColor="bg-white"
            />
          </View>
        </Animated.View>
      </SafeAreaView>

      <Animated.Image
        source={require('../../assets/images/onboarding.png')}
        resizeMode="cover"
        className="absolute left-0 top-0 -z-10 h-full w-full"
        style={imageAnimatedStyle}
        onLoad={() => setImageLoaded(true)}
        blurRadius={blurRadius}
      />
    </View>
  );
};

export default Home;
