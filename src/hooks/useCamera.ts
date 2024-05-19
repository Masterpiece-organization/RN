/* eslint-disable react-hooks/exhaustive-deps */
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import {useCallback, useState} from 'react';
import showAlert from '@/utils/showAlert';

interface UseCameraProps {
  onClose: () => void;
}

const useCamera = ({onClose}: UseCameraProps) => {
  const [imageResponse, setImageResponse] =
    useState<ImagePickerResponse | null>(null);

  const onImageGalleryClick = useCallback(() => {
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled');
        onClose();
      } else if (res.errorCode) {
        console.log('ImagePickerError: ', res.errorMessage);
        showError('앨범에 접근할수업습니다. 잠시후 다시 시도해주세요.');
      } else {
        setImageResponse(res);
        onClose();
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
      buttons: [{text: '닫기'}],
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
        onClose();
      } else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorMessage);
        showError('카메라를 사용할수없습니다. 잠시후 다시 시도해주세요.');
      } else {
        setImageResponse(res);
        onClose();
        /**
         * TODO: Needto send image to api
         */
        // SendImageToAPI(res.assets[0].base64, res.assets[0].type);
      }
    });
  }, []);

  return {imageResponse, setImageResponse, onImageGalleryClick, onCameraPress};
};

export default useCamera;
