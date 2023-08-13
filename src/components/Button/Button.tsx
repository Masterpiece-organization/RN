import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';
import PressableOpacity from '../PressableOpacity';
import {ButtonType} from './Button.types';
import Loader from '../Loader';
import scaleFont from '@/utils/scaleFont';

const Button = ({
  label,
  buttonColor,
  textColor,
  onPress,
  type = 'primary',
  disabled = false,
  isLoading = false,
  icon = null,
  customButtonStyle,
  customTextStyle,
}: ButtonType) => {
  //   const {colorScheme} = useColorScheme();

  const generateButtonStyle = (
    borderColor: {backgroundColor?: string | undefined} | undefined,
    type: string,
  ): object => {
    if (customButtonStyle) {
      return customButtonStyle;
    }
    if (type === 'outlined') {
      return {
        ...style.baseButton,
        borderColor: borderColor?.backgroundColor,
        ...style.outlinedButton,
      };
    }

    return {...style.baseButton, ...borderColor};
  };

  const generatedStyle = generateButtonStyle(buttonColor?.[0], type);

  const textStyle = customTextStyle ? customTextStyle : textColor;

  if (type === 'text') {
    return (
      <TouchableOpacity onPress={onPress} style={customButtonStyle}>
        {icon ? (
          icon
        ) : (
          <Text style={[style.textButton, textColor]}>{label}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <PressableOpacity
      onPress={onPress}
      disabled={disabled}
      isLoading={isLoading}
      customStyle={customButtonStyle}>
      <View style={generatedStyle}>
        <View>
          {isLoading ? (
            <Loader color={textColor?.[0]?.color} />
          ) : icon ? (
            icon
          ) : (
            <Text style={[textStyle, style.textButton]}>{label}</Text>
          )}
        </View>
      </View>
    </PressableOpacity>
  );
};

export default styled(Button, {
  props: {
    buttonColor: true,
    textColor: true,
    type: true,
    customButtonStyle: true,
    customTextStyle: true,
  },
});

const style = StyleSheet.create({
  baseButton: {
    height: 52,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  outlinedButton: {
    borderWidth: 1,
  },
  textButton: {
    fontSize: scaleFont(16),
  },
  baseText: {
    color: 'white',
  },
  iconContainer: {
    width: 52,
  },
});
