import {ReactNode} from 'react';

export interface ButtonType {
  label: string;
  buttonColor?: [{backgroundColor?: string | undefined}];
  textColor?: [{color?: string | undefined}];
  textStyle?: object;
  onPress: () => void;
  type?: 'text' | 'outlined' | 'primary';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  // leftIcon?: ReactNode;
  // rightIcon?: ReactNode;
  customButtonStyle?: object;
  customTextStyle?: object;
}
