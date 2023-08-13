export interface TextType {
  textColor?: [{color?: string | undefined}];
  type?: 'title' | 'subtitle' | 'bodySmall';
  classStyle?: string;
  onPress?: () => void;
  children?: React.ReactNode | string;
}
