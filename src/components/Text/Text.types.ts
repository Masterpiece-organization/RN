export interface TextType {
  textColor?: string;
  type?: 'title' | 'subtitle' | 'bodySmall';
  className?: string;
  onPress?: () => void;
  children?: React.ReactNode | string;
}
