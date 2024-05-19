import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from "react-native";
import { Controller, UseControllerProps } from "react-hook-form";
import { Text } from "@components/index";
import { clsx } from "clsx";
import { defaultInputStyle } from "@/theme";

export const TEXT_INPUT_TYPES = ["withLabel", "withoutLabel"] as const;

export type TextInputType = (typeof TEXT_INPUT_TYPES)[number];

export interface TextInputProps extends UseControllerProps {
  name: string;
  placeholder?: string;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  className?: string;
  secureTextEntry?: boolean;
  inputAccessoryViewID?: string;
  multiline?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
}

export const TextInput = ({
  control,
  name,
  placeholder,
  label,
  keyboardType = "default",
  editable = true,
  className,
  rules,
  secureTextEntry = false,
  inputAccessoryViewID,
  returnKeyType,
  autoFocus = false,
  ...props
}: TextInputProps) => {
  const textInputStyle = clsx(defaultInputStyle, className);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          {label && (
            <Text className="mb-2" color="text-gray-700 dark:text-gray-300">
              {label}
            </Text>
          )}
          <View
            className={`${textInputStyle} ${error ? "border-red" : ""} ${
              !editable ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            <RNTextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[
                styles.text,
                error && styles.error,
                !editable && styles.disabled,
              ]}
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor={"#B6B8BA"}
              className="color-black dark:color-white h-full"
              {...props}
              editable={editable}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType={returnKeyType ?? "done"}
              inputAccessoryViewID={inputAccessoryViewID}
              autoFocus={autoFocus}
            />
          </View>
          {error && error.message && (
            <Text color="text-red" type="caption" className="-mt-1 mb-2">
              {error.message || ""}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "WantedSans-Medium",
    textAlignVertical: "top",
  },
  error: {
    color: "#EA3829",
  },
  disabled: {
    color: "#B6B8BA",
  },
});
