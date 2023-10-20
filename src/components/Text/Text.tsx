import {Text as RNText} from 'react-native';
import {TextType} from './Text.types';
import {clsx} from 'clsx';
import {useMainContext} from '@/contexts/MainContext';

const Text = ({
  textColor = undefined,
  type,
  onPress,
  className,
  children,
}: TextType): JSX.Element => {
  const contexts = useMainContext();

  let textType = defaultStyle.body;

  if (type === 'title') {
    textType = defaultStyle.title;
  }

  if (type === 'subtitle') {
    textType = defaultStyle.subtitle;
  }

  if (type === 'subtitleBold') {
    textType = defaultStyle.subtitleBold;
  }

  if (type === 'subtitleSmall') {
    textType = defaultStyle.subtitleSmall;
  }

  if (type === 'bodySmall') {
    textType = defaultStyle.bodySmall;
  }

  if (type === 'bodySemi') {
    textType = defaultStyle.bodySemi;
  }

  if (type === 'small') {
    textType = defaultStyle.small;
  }

  const defaultColor =
    contexts?.colorScheme === 'dark' ? 'text-white' : 'text-black';

  const textStyle = clsx(textType, textColor ?? defaultColor, className);

  return (
    <RNText onPress={onPress} className={textStyle}>
      {children && children}
    </RNText>
  );
};

export default Text;

const defaultStyle = {
  title: 'text-2xl font-titleBold leading-7',
  subtitle: 'text-base font-titleMedium leading-5',
  subtitleBold: 'text-lg font-titleBold',
  subtitleSmall: 'text-base font-body',
  bodySemi: 'text-base font-bodySemiBold leading-[22px]',
  body: 'text-base font-bodyRegular leading-[22px]',
  bodySmall: 'text-sm font-bodyRegular',
  small: 'text-xs',
};
