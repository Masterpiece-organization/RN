import {
  StyleSheet,
  Text as RNText,
  TextStyle,
  StyleProp,
  useColorScheme,
} from 'react-native';
import {styled} from 'nativewind';
import {TextType} from './Text.types';
import scaleFont from '@/utils/scaleFont';

const Text = ({
  textColor,
  type,
  onPress,
  classStyle,
  children,
}: TextType): JSX.Element => {
  const colorScheme = useColorScheme();

  const defaultColor = {
    color: colorScheme === 'dark' ? '#fff' : '#222',
  };

  // Set default font type
  let textStyle: StyleProp<TextStyle> = {
    ...style.default,
    ...(textColor ? textColor?.[0] : defaultColor),
  };

  if (type === 'title') {
    textStyle = StyleSheet.compose(textStyle, style.title);
  }

  if (type === 'subtitle') {
    textStyle = StyleSheet.compose(textStyle, style.subtitle);
  }

  if (type === 'bodySmall') {
    textStyle = StyleSheet.compose(textStyle, style.bodySmall);
  }

  return (
    <RNText style={textStyle} onPress={onPress} className={classStyle}>
      {children && children}
    </RNText>
  );
};

export default styled(Text, {
  props: {
    textColor: true,
  },
});

const style = StyleSheet.create({
  title: {
    fontSize: scaleFont(36),
    fontWeight: '600',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: scaleFont(24),
    fontWeight: '500',
    lineHeight: 32,
  },
  bodySmall: {
    fontSize: scaleFont(12),
    fontWeight: '400',
    lineHeight: 16,
  },
  default: {
    fontSize: scaleFont(16),
    fontWeight: '400',
    lineHeight: 24,
  },
});
