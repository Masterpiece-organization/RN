import React from 'react';
import {View, TouchableOpacity} from 'react-native';
// import {styled} from 'nativewind';
// import PressableOpacity from '../PressableOpacity';
import {ButtonType} from './Button.types';
import Loader from '../Loader';
import {clsx} from 'clsx';
import {useMainContext} from '@/context/MainContext';
import Text from '../Text';

const Button = ({
  label,
  buttonColor,
  textColor,
  onPress,
  type = 'primary',
  disabled = false,
  isLoading = false,
  icon = null,
  className,
}: ButtonType) => {
  const contexts = useMainContext();
  // colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-black';
  // colorScheme === 'dark' ? 'text-white' : 'text-neutral-600';

  // const defaultColor =
  //   contexts?.colorScheme === 'dark' ? 'text-black' : 'text-white';

  const defaultBg =
    contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-black';

  let buttonType = defaultStyle.baseButton;

  if (type === 'text') {
    buttonType = defaultStyle.textButton;
  }

  if (type === 'outlined') {
    buttonType = defaultStyle.outlinedButton;
  }

  const buttonStyle = clsx(buttonType, buttonColor ?? defaultBg, className);

  const textStyle = clsx(textColor ?? defaultStyle.textColor);

  console.log(buttonStyle);

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

  // const generateButtonStyle = (
  //   borderColor: {backgroundColor?: string | undefined} | undefined,
  //   type: string,
  // ): object => {
  //   if (customButtonStyle) {
  //     return customButtonStyle;
  //   }
  //   if (type === 'outlined') {
  //     return {
  //       ...style.baseButton,
  //       borderColor: borderColor?.backgroundColor,
  //       ...style.outlinedButton,
  //     };
  //   }

  //   return {...style.baseButton, ...borderColor};
  // };

  // const generatedStyle = generateButtonStyle(buttonColor?.[0], type);

  // const textStyle = customTextStyle ? customTextStyle : textColor;

  // if (type === 'text') {
  //   return (
  //     <TouchableOpacity onPress={onPress} style={customButtonStyle}>
  //       {icon ? (
  //         icon
  //       ) : (
  //         <Text style={[style.textButton, textColor]}>{label}</Text>
  //       )}
  //     </TouchableOpacity>
  //   );
  // }

  // return (
  //   <PressableOpacity
  //     onPress={onPress}
  //     disabled={disabled}
  //     isLoading={isLoading}
  //     customStyle={customButtonStyle}>
  //     <View style={generatedStyle}>
  //       <View>
  //         {isLoading ? (
  //           <Loader color={textColor?.[0]?.color} />
  //         ) : icon ? (
  //           icon
  //         ) : (
  //           <Text style={[textStyle, style.textButton]}>{label}</Text>
  //         )}
  //       </View>
  //     </View>
  //   </PressableOpacity>
  // );
};

// export default styled(Button, {
//   props: {
//     buttonColor: true,
//     textColor: true,
//     type: true,
//     customButtonStyle: true,
//     customTextStyle: true,
//   },
// });

export default Button;

// const style = StyleSheet.create({
//   baseButton: {
//     height: 52,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     flexDirection: 'row',
//   },
//   outlinedButton: {
//     borderWidth: 1,
//   },
//   textButton: {
//     fontSize: scaleFont(16),
//   },
//   baseText: {
//     color: 'white',
//   },
//   iconContainer: {
//     width: 52,
//   },
// });

const defaultStyle = {
  baseButton: 'h-12 w-100 justify-center items-center rounded-lg flex-row',
  textButton: '',
  outlinedButton:
    'h-12 w-100 justify-center items-center rounded-lg flex-row border',
  textColor: 'text-white',
};
