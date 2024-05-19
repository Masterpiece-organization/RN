import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
} from 'react-native-reanimated';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useEffect} from 'react';
import {OverlayProps} from './Overlay.type';

const Overlay = ({isOverlayActive, onPress}: OverlayProps) => {
  const overlayOpacity = useSharedValue(0);

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  useEffect(() => {
    overlayOpacity.value = isOverlayActive
      ? withTiming(1, {
          duration: 100,
          easing: Easing.ease,
        })
      : withTiming(0, {
          duration: 100,
          easing: Easing.ease,
        });
  }, [isOverlayActive, overlayOpacity]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.overlay, overlayAnimatedStyle]} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000070',
    flex: 1,
    // pointerEvents: 'none',
  },
});

export default Overlay;
