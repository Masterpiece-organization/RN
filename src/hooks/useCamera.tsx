/* eslint-disable react-hooks/exhaustive-deps */
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import {Dispatch, SetStateAction, useCallback} from 'react';

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
