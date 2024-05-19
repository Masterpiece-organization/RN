import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {clsx} from 'clsx';
import {containerStyle} from '@/theme';
import {StyleProp, ViewStyle} from 'react-native';

const CONTAINER_TYPES = ['card', 'detail'] as const;
type ContainerType = (typeof CONTAINER_TYPES)[number];

const CONTAINER_VARIANTS = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  undefined,
] as const;
type ContainerVariantType = (typeof CONTAINER_VARIANTS)[number];

interface ContainerProps {
  type?: ContainerType;
  variant?: ContainerVariantType;
  className?: string;
  extraHeight?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const Container = ({
  type = 'detail',
  variant,
  className,
  extraHeight,
  children,
  contentContainerStyle,
}: ContainerProps) => {
  const KeyboardContainerStyle = clsx(containerStyle(type), className);

  return (
    <KeyboardAwareScrollView
      // bounces={false}

      keyboardDismissMode="interactive"
      contentContainerStyle={[
        {
          justifyContent: variant,
          paddingBottom: 80,
        },
        contentContainerStyle,
      ]}
      className={KeyboardContainerStyle}
      extraHeight={extraHeight}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default Container;
