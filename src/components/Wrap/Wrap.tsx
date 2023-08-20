import {View} from 'react-native';
import {useMainContext} from '@/context/MainContext';
import {clsx} from 'clsx';
import {WrapType} from './Wrap.type';

const Wrap = ({border = false, classStyle, children}: WrapType) => {
  const contexts = useMainContext();

  const borderColor =
    contexts?.colorScheme === 'dark'
      ? 'border-neutral-700 border rounded-lg'
      : 'border-neutral-300 border rounded-lg';

  const className = clsx(border && borderColor, classStyle);

  return <View className={className}>{children}</View>;
};

export default Wrap;
