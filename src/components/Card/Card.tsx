import {View} from 'react-native';
import Text from '../Text';
import {CardPropsType} from './Card.type';
import {clsx} from 'clsx';
import useTheme from '@/hooks/useTheme';

const Card = ({title, titleButton, className, children}: CardPropsType) => {
  const {borderColorTheme, cardBgTheme} = useTheme();
  const {borderDefault} = borderColorTheme();
  const {cardBg} = cardBgTheme();

  const WrapStyle = clsx(className, defaultStyle.default, cardBg);

  return (
    <View className={WrapStyle}>
      {title && (
        <View
          className={`flex-row items-center justify-between border-b px-5 py-sm ${borderDefault}`}>
          <Text type="bodySmall">{title}</Text>
          {titleButton}
        </View>
      )}
      {children}
    </View>
  );
};

export default Card;

const defaultStyle = {
  default: 'rounded-lg border',
};
