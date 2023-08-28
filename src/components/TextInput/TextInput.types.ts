import {TextInputProps} from 'react-native';
import {UseControllerProps} from 'react-hook-form';

export interface FormInputType extends UseControllerProps, TextInputProps {
  // type?: 'email' | 'password' | 'text';
  // label?: string;
  // error?: string;
  // value?: string;
  // onChangeText?: (text: string) => void;
  // placeholderTextColor?: string;
  // editable?: boolean;
  // name: string;
  // defaultValue?: string;
  // setFormError: Function;
  label?: string;
  name: string;
  defaultValue?: string;
  setFormError: Function;
}

export interface optionType {
  label?: string;
  placeholder?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
}
