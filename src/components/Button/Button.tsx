import {Pressable, View} from 'react-native';
import {clsx} from 'clsx';
import Text from '../Text';
import {TextType} from '../Text/Text';
import LinearGradient from 'react-native-linear-gradient';
import {useColorScheme} from 'react-native';
import {defaultButtonStyle, defualtOutlinedStyle} from '@/theme';

export const BUTTON_TYPES = ['filled', 'text', 'outlined'] as const;
export const BUTTON_VARIANT_TYPES = [
  'primary',
  'secondary',
  'split',
  'custom',
] as const;

export type ButtonType = (typeof BUTTON_TYPES)[number];
export type ButtonVariantType = (typeof BUTTON_VARIANT_TYPES)[number];

export interface ButtonProps {
  label?: string;
  labelColor?: string;
  textType?: TextType;
  type?: ButtonType;
  variant?: ButtonVariantType;
  color?: string;
  onPress?: () => void;
  isOnPressed?: boolean;
  disabled?: boolean;
  isOnKeyboard?: boolean;
  float?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const variants: {
  [type in ButtonType]: Partial<{[variant in ButtonVariantType]: string}>;
} = {
  filled: {
    primary: `${defaultButtonStyle} bg-primary active:bg-primaryActive`,
    secondary: `${defaultButtonStyle} bg-gray-950 active:bg-black dark:active:bg-gray-800`,
    custom: `${defaultButtonStyle}`,
  },
  outlined: {
    primary: `${defaultButtonStyle} ${defualtOutlinedStyle}`,
    split: `${defaultButtonStyle} ${defualtOutlinedStyle} justify-between`,
  },
  text: {
    primary: 'active:bg-gray-100 dark:active:bg-gray-950 p-2 rounded-lg',
    split: 'flex-row justify-between',
    custom: '',
  },
};

const lightGradient = [
  'rgba(255, 255, 255, 0)',
  'rgba(255, 255, 255, .6)',
  'rgba(255, 255, 255, .9)',
  '#fff',
];

const darkGradient = [
  'rgba(22, 24, 26, 0)',
  'rgba(22, 24, 26, .6)',
  'rgba(22, 24, 26, .9)',
  'rgba(22, 24, 26, 0)',
];

// ----------------- BUTTON -------------------

const Button = ({
  label = '',
  labelColor = 'text-white',
  textType,
  type = 'filled',
  variant = 'primary',
  onPress,
  isOnPressed = false,
  disabled = false,
  isOnKeyboard = false,
  float = false,
  className,
  children,
}: ButtonProps) => {
  const buttonStyle = clsx(
    variants[type][variant],
    {'border-primary': isOnPressed},
    {'active:scale-105': isOnKeyboard},
    className,
    {['bg-inActive']: disabled},
  );

  /**
   * TODO
   * Need to update Nativewind to v4.0
   * : group state doesn't work v2.0
   */
  const labelStyle = clsx(labelColor, {
    [labelColor]: !isOnPressed,
    ['text-primary']: isOnPressed,
    ['text-white']: disabled,
  });

  const colorScheme = useColorScheme();

  return (
    <>
      <Pressable onPress={onPress} className={buttonStyle} disabled={disabled}>
        {label ? (
          <Text weight="medium" color={labelStyle} type={textType}>
            {label}
          </Text>
        ) : (
          children
        )}
      </Pressable>
      {float && (
        <View pointerEvents="none">
          <LinearGradient
            colors={colorScheme === 'light' ? lightGradient : darkGradient}
            className="absolute bottom-0 left-0 h-24 w-full"
          />
        </View>
      )}
    </>
  );
};

export default Button;
