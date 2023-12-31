import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import {Text, Button} from '@/components';
import CloseIcon from '@/assets/icons/closeIcon.svg';

const BottomSheet = ({modalVisible, setModalVisible, title}: any) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <Text type="title" textColor="text-black" className="mb-xl">
            {title}
          </Text>
          <View className="w-full px-lg">
            <Button
              label="로그아웃"
              buttonColor="bg-primary mb-xs"
              onPress={console.log}
            />
            <Button
              label="취소"
              buttonColor="bg-gray-800"
              onPress={closeModal}
            />
          </View>
          <View className="absolute right-[30px] top-9">
            {/* <CloseIcon onPress={closeModal} /> */}
            <Button
              label=""
              onPress={closeModal}
              type="text"
              buttonColor=""
              className="border-gray-400"
              icon={<CloseIcon onPress={closeModal} />}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 300,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 84,
  },
});

export default BottomSheet;
