import {View, TextInput as RNTextInput} from 'react-native';
import {useController, useFormContext} from 'react-hook-form';
import {FormInputType} from './TextInput.types';
import {Text} from '@components/index';
import {clsx} from 'clsx';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMainContext} from '@/contexts/MainContext';

const ControlledInput = (props: FormInputType) => {
  const contexts = useMainContext();

  const formContext = useFormContext();
  const {formState} = formContext;

  const {name, label, rules, defaultValue, className, editable, ...inputProps} =
    props;

  const {field} = useController({name, rules, defaultValue});

  const hasError = Boolean(formState?.errors[name]);

  const containerStyle = clsx(styles.container, className);
  const inputStyle = clsx(
    editable === undefined || editable === true
      ? contexts?.colorScheme === 'dark'
        ? 'text-white'
        : 'text-black'
      : 'text-neutral-400',
    styles.input,
  );

  const error = formState?.errors[name]?.message as string;

  return (
    <View className={containerStyle}>
      {label && <Text className={styles.label}>{label}</Text>}
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={false}>
        <View className="justify-center">
          <RNTextInput
            autoCapitalize="none"
            textAlign="left"
            className={inputStyle}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            placeholderTextColor="#9ca3af"
            editable={editable}
            {...inputProps}
          />
        </View>
      </KeyboardAwareScrollView>

      <View>
        {hasError && (
          <Text
            textColor="text-red-700"
            type="bodySmall"
            className={styles.errorContainer}>
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};

export const TextInput = (props: FormInputType) => {
  const {name, setFormError} = props;

  const formContext = useFormContext();

  // Placeholder until input name is initialized
  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    setFormError(true);
    return null;
  }

  return <ControlledInput {...props} />;
};

const styles = {
  container: '',
  label: '',
  input: 'p-4 h-12 border border-neutral-300 rounded-lg',
  errorContainer: 'my-1',
};

export default TextInput;
