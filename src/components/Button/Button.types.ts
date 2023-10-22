import {ReactNode} from 'react';

export interface ButtonType {
  label: string;
  buttonColor?: string;
  textColor?: string;
  textSize?: string;
  textType?:
    | 'title'
    | 'subtitle'
    | 'subtitleBold'
    | 'subtitleSmall'
    | 'bodySemi'
    | 'bodySmall'
    | 'small';
  textStyle?: object;
  onPress?: () => void;
  type?: 'text' | 'outlined' | 'primary' | 'dark';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
  buttonWrap?: string;
}
