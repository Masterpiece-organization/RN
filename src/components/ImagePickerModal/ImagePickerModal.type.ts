import {Dispatch, SetStateAction} from 'react';

export interface ImagePickerModalType {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onImageLibraryPress: () => void;
  onCameraPress: () => void;
}
