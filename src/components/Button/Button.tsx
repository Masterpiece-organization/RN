import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ButtonType} from './Button.types';
import Loader from '../Loader';
import {clsx} from 'clsx';
import {useMainContext} from '@/contexts/MainContext';
import Text from '../Text';

const Button = ({
  label,
  buttonColor,
  textColor,
  textSize,
  onPress,
  type = 'primary',
  disabled = false,
  isLoading = false,
  icon = null,
  className,
}: ButtonType) => {
  const contexts = useMainContext();

  const defaultBg = disabled
    ? 'bg-neutral-400'
    : contexts?.colorScheme === 'dark'
    ? 'bg-neutral-700'
    : 'bg-black';

  let buttonType = defaultStyle.baseButton;

  if (type === 'text') {
    buttonType = defaultStyle.textButton;
  }

  if (type === 'outlined') {
    buttonType = defaultStyle.outlinedButton;
  }

  const buttonStyle = clsx(buttonType, buttonColor ?? defaultBg, className);

  const textStyle = clsx(textColor ?? defaultStyle.textColor, textSize);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={buttonStyle}
      disabled={disabled}>
      {isLoading ? (
        <Loader color={textStyle} />
      ) : (
        <View className="items-center justify-center flex-row">
          {icon}
          <Text className={textStyle}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const defaultStyle = {
  baseButton: 'w-100 h-12 justify-center items-center rounded-lg flex-row',
  textButton: '',
  outlinedButton:
    'w-100 h-12 justify-center items-center rounded-lg flex-row border',
  textColor: 'text-white',
};
