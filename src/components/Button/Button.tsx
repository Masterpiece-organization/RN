import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ButtonType} from './Button.types';
import Loader from '../Loader';
import {clsx} from 'clsx';
import Text from '../Text';
import {rowCenter} from '@/theme';

const Button = ({
  label,
  buttonColor,
  textColor,
  textSize,
  textType,
  onPress,
  type = 'primary',
  disabled = false,
  isLoading = false,
  icon = null,
  className,
  buttonWrap,
}: ButtonType) => {
  let defaultBg = disabled ? 'bg-gray-400' : 'bg-primary';

  let buttonType = defaultStyle.baseButton;

  if (type === 'text') {
    buttonType = defaultStyle.textButton;
  }

  if (type === 'outlined') {
    buttonType = defaultStyle.outlinedButton;
  }

  if (type === 'dark') {
    defaultBg = 'bg-gray-800';
  }

  const buttonStyle = clsx(buttonType, buttonColor ?? defaultBg, className);

  const textStyle = clsx(
    disabled
      ? defaultStyle.disabledTextColor
      : textColor ?? defaultStyle.textColor,
    textSize,
  );

  const buttonWrapStyle = clsx(rowCenter, buttonWrap);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={buttonStyle}
      disabled={disabled}>
      {isLoading ? (
        <Loader color={textStyle} />
      ) : (
        <View className={buttonWrapStyle}>
          <Text className={textStyle} type={textType}>
            {label}
          </Text>
          {icon}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const defaultStyle = {
  baseButton: 'w-100 h-[52px] justify-center items-center rounded-lg flex-row',
  textButton: '',
  outlinedButton:
    'w-100 h-[52px] justify-center items-center rounded-lg flex-row border',
  textColor: 'text-white',
  disabledTextColor: 'text-gray-600',
};
