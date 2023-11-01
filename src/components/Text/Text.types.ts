export interface TextType {
  textColor?: string;
  textColortype?: 'black' | 'dark' | 'grey';
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
  numberOfLines?: number;
  children?: React.ReactNode | string;
}
