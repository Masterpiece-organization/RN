import {Modal, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import {View} from 'react-native';
import Button from '../Button';
import {ImagePickerModalType} from './ImagePickerModal.type';
import {useMainContext} from '@/contexts/MainContext';

const ImagePickerModal = ({
  isVisible,
  setIsVisible,
  onImageLibraryPress,
  onCameraPress,
}: ImagePickerModalType) => {
  const contexts = useMainContext();

  return (
    <Modal
      animationType={'fade'}
      visible={isVisible}
      transparent={true}
      onRequestClose={() => {
        setIsVisible(false);
      }}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <SafeAreaView className="flex-1 justify-end bg-black/50">
          <View className="gap-4 px-5">
            <View
              className={`${
                contexts?.colorScheme === 'dark' ? 'bg-neutral-800' : 'bg-black'
              } rounded-lg
            `}>
              <View className="border-b border-b-neutral-600">
                <Button
                  label="앨범에서 선택"
                  onPress={onImageLibraryPress}
                  buttonColor=""
                  textColor={
                    contexts?.colorScheme === 'dark'
                      ? 'text-white'
                      : 'text-white'
                  }
                />
              </View>

              <Button
                label="사진 찍기"
                onPress={onCameraPress}
                buttonColor=""
                textColor={
                  contexts?.colorScheme === 'dark' ? 'text-white' : 'text-white'
                }
              />
            </View>
            <View>
              <Button
                label="취소"
                onPress={() => setIsVisible(false)}
                buttonColor={
                  contexts?.colorScheme === 'dark'
                    ? 'bg-neutral-800'
                    : 'bg-black'
                }
                textColor={
                  contexts?.colorScheme === 'dark' ? 'text-white' : 'text-white'
                }
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImagePickerModal;
