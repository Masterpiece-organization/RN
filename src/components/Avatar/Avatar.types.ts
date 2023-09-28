import {ImagePickerResponse} from 'react-native-image-picker';

export interface AvatarType {
  className?: string;
  iconClassName?: string;
  pickerResponse?: ImagePickerResponse | null;
  handleOnPress?: () => void;
  disabled: boolean;
}
