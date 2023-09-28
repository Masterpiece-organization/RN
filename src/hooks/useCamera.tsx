/* eslint-disable react-hooks/exhaustive-deps */
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import {Dispatch, SetStateAction, useCallback} from 'react';
import showAlert from '@/utils/showAlert';

interface UseCameraPropsType {
  setPickerResponse: Dispatch<SetStateAction<ImagePickerResponse | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const useCamera = ({
  setPickerResponse,
  setIsModalVisible,
}: UseCameraPropsType) => {
  const onImageGalleryClick = useCallback(() => {
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled');
        setIsModalVisible(false);
      } else if (res.errorCode) {
        console.log('ImagePickerError: ', res.errorMessage);
        showError('앨범에 접근할수업습니다. 잠시후 다시 시도해주세요.');
      } else {
        setPickerResponse(res);
        setIsModalVisible(false);
        /**
         * TODO: Needto send image to api
         */
        // sendImageToAPI(res.assets[0].base64, res.assets[0].type);
      }
    });
  }, []);

  const showError = (message: string) => {
    showAlert({
      title: '',
      message,
      onPress: () => null,
    });
  };

  const onCameraPress = useCallback(() => {
    const options: CameraOptions = {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
        setIsModalVisible(false);
      } else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorMessage);
        showError('카메라를 사용할수없습니다. 잠시후 다시 시도해주세요.');
      } else {
        setPickerResponse(res);
        setIsModalVisible(false);
        /**
         * TODO: Needto send image to api
         */
        // SendImageToAPI(res.assets[0].base64, res.assets[0].type);
      }
    });
  }, []);

  return {onImageGalleryClick, onCameraPress};
};

export default useCamera;
