import {Text as RNText} from 'react-native';
import {TextType} from './Text.types';
import {clsx} from 'clsx';
import useTheme from '@/hooks/useTheme';

const Text = ({
  textColor = undefined,
  textColortype = 'black',
  type,
  onPress,
  className,
  numberOfLines,
  children,
}: TextType): JSX.Element => {
  const {textColorThemes} = useTheme();
  const {black, dark} = textColorThemes();

  let textType;

  switch (type) {
    case 'title':
      textType = defaultStyle.title;
      break;
    case 'subtitle':
      textType = defaultStyle.subtitle;
      break;
    case 'subtitleBold':
      textType = defaultStyle.subtitleBold;
      break;
    case 'subtitleSmall':
      textType = defaultStyle.subtitleSmall;
      break;
    case 'bodySmall':
      textType = defaultStyle.bodySmall;
      break;
    case 'bodySemi':
      textType = defaultStyle.bodySemi;
      break;
    case 'small':
      textType = defaultStyle.small;
      break;
    default:
      textType = defaultStyle.body;
  }

  let defaultColor;

  switch (textColortype) {
    case 'dark':
      defaultColor = dark;
      break;
    case 'grey':
      defaultColor = 'text-gray-600';
      break;
    default:
      defaultColor = black;
  }

  const textStyle = clsx(textType, textColor ?? defaultColor, className);

  return (
    <RNText
      onPress={onPress}
      className={textStyle}
      numberOfLines={numberOfLines}>
      {children && children}
    </RNText>
  );
};

export default Text;

const defaultStyle = {
  title: 'text-2xl font-titleBold leading-7',
  subtitle: 'text-base font-titleMedium leading-5',
  subtitleBold: 'text-lg font-titleBold',
  subtitleSmall: 'text-base font-bodySemiBold',
  bodySemi: 'text-base font-bodySemiBold leading-[22px]',
  body: 'text-base font-bodyRegular leading-[22px]',
  bodySmall: 'text-sm font-bodyRegular',
  small: 'text-xs',
};
