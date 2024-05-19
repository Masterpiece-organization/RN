import {InputAccessoryView as RNInputAccessoryView} from 'react-native';
import {Button} from '@/components';

interface inputAccessoryViewProps {
  inputAccessoryViewID: string;
  label: string;
  onPress: () => void;
  isDisabled?: boolean;
}

const InputAccessoryView = ({
  inputAccessoryViewID,
  label,
  onPress,
  isDisabled,
}: inputAccessoryViewProps) => {
  return (
    <RNInputAccessoryView nativeID={inputAccessoryViewID}>
      <Button
        label={label}
        onPress={onPress}
        className="rounded-none"
        isOnKeyboard
        disabled={isDisabled}
      />
    </RNInputAccessoryView>
  );
};

export default InputAccessoryView;
