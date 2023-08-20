import {Text as RNText} from 'react-native';
import {TextType} from './Text.types';
import {clsx} from 'clsx';
import {useMainContext} from '@/context/MainContext';

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

  if (type === 'bodySmall') {
    textType = defaultStyle.bodySmall;
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
  title: 'text-2xl font-bold',
  subtitle: 'text-lg font-medium',
  body: 'text-base',
  bodySmall: 'text-sm',
};
