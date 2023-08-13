import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput as FormInput,
  TextInputProps,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Error from '../Error/Error';

import {FormInputType} from './TextInput.types';
import {generateOptions} from './TextInput.utils';
import scaleFont from '@/utils/scaleFont';

const TextInput = ({
  type,
  label,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  autoCapitalize,
  onBlur,
  editable,
  error,
}: FormInputType & TextInputProps) => {
  const colorScheme = useColorScheme();

  const defaultColor = {
    color: colorScheme === 'dark' ? '#fff' : '#222',
  };

  const [input, setInput] = useState(value);

  const [secureEntry, setSecureEntry] = useState(type === 'password');
  const secureEntryLabel = secureEntry ? 'Show' : 'Hide';

  const textInputOptions = generateOptions({
    type,
    label,
    placeholder,
    autoCapitalize,
  });

  const handleTextChange = (text: string) => {
    setInput(text);
    onChangeText && onChangeText(text);
  };

  const passwordOnPress = () => setSecureEntry(!secureEntry);

  return (
    <View style={style.container}>
      {label && <Text style={style.label}>{textInputOptions?.label}</Text>}
      <View style={style.inputContainer}>
        <FormInput
          placeholderTextColor={placeholderTextColor}
          style={[style.input, defaultColor]}
          onChangeText={handleTextChange}
          value={input}
          onBlur={onBlur}
          editable={editable}
          secureTextEntry={secureEntry}
          {...textInputOptions}
        />
        {type === 'password' && (
          <Text
            onPress={passwordOnPress}
            style={style.secureEntryButtonLabel}
            className="text-base">
            {secureEntryLabel}
          </Text>
        )}
      </View>
      <Error error={error} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  label: {
    fontWeight: '700',
    fontSize: scaleFont(16),
    color: '#525252',
    height: 14,
    marginLeft: 4,
    marginBottom: 4,
  },
  inputContainer: {
    height: 52,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: '#d4d4d4',
    borderWidth: 1,
  },
  input: {
    height: 52,
    flex: 1,
    paddingHorizontal: 16,
    fontSize: scaleFont(16),
  },
  secureEntryButtonLabel: {
    position: 'absolute',
    right: 16,
    color: '#3182CE',
    fontSize: scaleFont(16),
    fontWeight: '500',
  },
});
export default TextInput;
