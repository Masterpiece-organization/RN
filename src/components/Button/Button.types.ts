import {ReactNode} from 'react';

export interface ButtonType {
  label: string;
  buttonColor?: string;
  textColor?: string;
  textSize?: string;
  textStyle?: object;
  onPress: () => void;
  type?: 'text' | 'outlined' | 'primary';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
}
