import {useEffect} from 'react';
import {View, Modal, Platform, ActionSheetIOS, Pressable} from 'react-native';
import {StyledCameraIcon, StyledImageIcon} from '@/constants/icons';
import {Text} from '@/components';

const ImagePickerModal = ({
  visible = false,
  onClose,
  isUploaded,
  setImageResponse,
  onImageLibraryPress,
  onCameraPress,
}) => {
  useEffect(() => {
    if (Platform.OS === 'ios' && visible) {
      const options = ['카메라로 촬영하기', '사진 선택하기'];
      let destructiveButtonIndex = -1;
      if (isUploaded) {
        options.push('프로필 사진 삭제');
        destructiveButtonIndex = options.length - 1; // '프로필 사진 삭제'를 destructive 버튼으로 설정
      }
      options.push('취소');
      const cancelButtonIndex = options.length - 1;

      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          // cancelButtonTintColor: 'red',
          destructiveButtonIndex,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            console.log('카메라 촬영');
            onCameraPress();
          } else if (buttonIndex === 1) {
            console.log('사진 선택');
            onImageLibraryPress();
          } else if (isUploaded && buttonIndex === destructiveButtonIndex) {
            console.log('프로필 사진 삭제');
            setImageResponse(null);
            onClose();
          }
          if (buttonIndex === cancelButtonIndex) {
            onClose(); // 모달을 닫음
          }
        },
      );
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable
        className="flex-1 items-center justify-center bg-black/60"
        onPress={onClose}>
        <View className="w-72 rounded-lg bg-white" style={{elevation: 2}}>
          <Pressable
            className="flex-row items-center p-4"
            android_ripple={{color: '#eee'}}>
            <StyledCameraIcon
              className="color-gray-200 mr-2"
              width={22}
              height={22}
            />
            <Text>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            className="flex-row items-center p-4"
            android_ripple={{color: '#eee'}}>
            <StyledImageIcon
              className="color-gray-200 mr-2"
              width={22}
              height={22}
            />
            <Text>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ImagePickerModal;
