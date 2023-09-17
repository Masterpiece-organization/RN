import {View} from 'react-native';
import {borderBottomStyle, elementBackgroundStyle, cardGap} from '@/theme';
import Text from '../Text';
import {CardPropsType} from './Card.type';
import {clsx} from 'clsx';

const Card = ({title, titleButton, className, children}: CardPropsType) => {
  const WrapStyle = clsx(cardGap, elementBackgroundStyle, className);

  return (
    <View className={WrapStyle}>
      {title && (
        <View
          className={`mb-1 flex-row items-center justify-between border-b px-5 pb-3 ${borderBottomStyle}`}>
          <Text type="bodySmall">{title}</Text>
          {titleButton}
        </View>
      )}
      {children}
    </View>
  );
};

export default Card;
