import {ImagePickerResponse} from 'react-native-image-picker';

export interface AvatarType {
  pickerResponse: ImagePickerResponse | null;
  handleOnPress: () => void;
}
