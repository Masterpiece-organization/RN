import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useColorScheme} from 'react-native';
import {Text, Button} from '@/components';

export interface WheelPcikerProps {
  isVisible: boolean;
  pickerType?: 'date' | 'time' | 'datetime' | undefined;
  date?: Date | string | undefined;
  onConfirm: (selectedDate: any) => void;
  onCancel: () => void;
  maximumDate?: Date;
}

const renderConfirmButton = ({onPress}: any) => (
  <Button
    type="text"
    variant="custom"
    className="items-center justify-center rounded-b-xl border-t border-gray-100 bg-white py-4 dark:border-gray-700 dark:bg-gray-950"
    onPress={onPress}>
    <Text className="text-xl text-primary" weight="semibold">
      확인
    </Text>
  </Button>
);

const renderCancelButton = ({onPress}: any) => (
  <Button
    type="text"
    variant="custom"
    className="items-center justify-center rounded-xl bg-white py-4 dark:bg-gray-950"
    onPress={onPress}>
    <Text className="text-xl text-red" weight="semibold">
      취소
    </Text>
  </Button>
);

const WheelPicker = ({
  isVisible = true,
  date,
  onConfirm,
  onCancel,
  pickerType = 'date',
  maximumDate,
}: WheelPcikerProps) => {
  const colorScheme = useColorScheme();

  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={pickerType}
      locale="ko_KR"
      onConfirm={onConfirm}
      date={date instanceof Date ? date : new Date()}
      onCancel={onCancel}
      cancelTextIOS="취소"
      confirmTextIOS="확인"
      isDarkModeEnabled={true}
      pickerContainerStyleIOS={{
        backgroundColor: colorScheme === 'light' ? '#fff' : '#2A2C2E',
      }}
      customConfirmButtonIOS={renderConfirmButton}
      customCancelButtonIOS={renderCancelButton}
      maximumDate={maximumDate}
    />
  );
};

export default WheelPicker;
