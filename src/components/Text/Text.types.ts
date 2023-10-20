export interface TextType {
  textColor?: string;
  type?:
    | 'title'
    | 'subtitle'
    | 'subtitleBold'
    | 'subtitleSmall'
    | 'bodySemi'
    | 'bodySmall'
    | 'small';
  className?: string;
  onPress?: () => void;
  children?: React.ReactNode | string;
}
