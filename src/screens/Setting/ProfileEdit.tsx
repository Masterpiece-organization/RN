import {useState, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  InputAccessoryView,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  Avatar,
  Button,
  BottomSheet,
  BottomSheetContent,
  TextInput,
  ImagePickerModal,
  WheelPicker,
  SelectButton,
} from '@/components';
import {useForm, FieldValues} from 'react-hook-form';
import useCamera from '@/hooks/useCamera';
import {
  SettingScreenProps,
  SettingScreens,
  CommonScreens,
} from '@/types/navigationTypes';
import useCalculateAge from '@/hooks/useCalculateAge';
import {ContentTypes} from '@/constants/bottomSheetData';
import {REFERENCE_DATA} from '@/constants';
import useBottomSheet from '@/hooks/useBottomSheet';

interface SelectedOptionType {
  [key: string]: string;
}
const today = new Date();

const createItems = ({
  setIsBirthPickerVisible,
  handleBottomSheet,
  navigation,
  control,
  inputAccessoryViewID,
}) => {
  return {
    inputs: [
      {
        id: 'email',
        name: 'email',
        label: '이메일',
        placeholder: '이메일 주소',
        editable: false,
        control,
      },
      {
        id: 'nickname',
        name: 'nickname',
        label: '닉네임',
        control,
        inputAccessoryViewID,
      },
    ],
    inputButtons: [
      {
        id: 'age',
        name: 'age',
        label: '나이',
        placeholder: '나이 입력',
        onButtonPress: () => setIsBirthPickerVisible(true),
        control,
      },
      {
        id: 'location',
        name: 'location',
        label: '활동지역',
        placeholder: '활동지역 입력',
        onButtonPress: () => handleBottomSheet('location'),
        control,
      },
      {
        id: 'position',
        name: 'position',
        label: '포지션',
        placeholder: '포지션 입력',
        onButtonPress: () =>
          navigation.navigate(CommonScreens.POSITION_SETUP, {
            type: 'edit',
            nickName: '',
          }),
        control,
      },
      {
        id: 'level',
        name: 'level',
        keyboardType: 'email-address',
        label: '레벨',
        placeholder: '레벨 입력',
        onButtonPress: () => handleBottomSheet('level'),
        control,
      },
    ],
  };
};

const ProfileEdit = ({
  navigation,
}: SettingScreenProps<SettingScreens.PROFILE_EDIT>) => {
  const inputAccessoryViewID = 'nickname';
  const {bottomSheetRef, open} = useBottomSheet();

  const [isImagePickerVisible, setisImagePickerVisible] = useState(false);
  const [isBirthPickervisible, setIsBirthPickerVisible] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState<
    ContentTypes | undefined
  >();

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionType>({
    gender: '',
    foot: '',
  });

  const {control, handleSubmit, getValues, setValue} = useForm<FieldValues>({
    defaultValues: {
      email: 'test@test.com',
      nickname: '닉네임',
      age: '',
      location: '',
      level: '',
      position: '',
    },
  });

  const {imageResponse, setImageResponse, onImageGalleryClick, onCameraPress} =
    useCamera({
      onClose: () => setisImagePickerVisible(false),
    });

  const {selectedDate, calculateAge} = useCalculateAge();

  const setBirthDate = (date: Date) => {
    const currentAge = calculateAge(date);
    setValue('age', currentAge);
    setIsBirthPickerVisible(false);
  };

  const handleBottomSheet = useCallback((type: ContentTypes) => {
    setBottomSheetType(type);
    open();
  }, []);

  const items = createItems({
    setIsBirthPickerVisible,
    handleBottomSheet,
    navigation,
    control,
    inputAccessoryViewID,
  });

  const updateSelectedOptions = (type: string, option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [type]: prev[type] === option ? '' : option,
    }));
  };

  return (
    <>
      <ImagePickerModal
        visible={isImagePickerVisible}
        isUploaded={imageResponse}
        setImageResponse={setImageResponse}
        onClose={() => setisImagePickerVisible(false)}
        onImageLibraryPress={onImageGalleryClick}
        onCameraPress={onCameraPress}
      />
      <WheelPicker
        pickerType="date"
        date={selectedDate}
        isVisible={isBirthPickervisible}
        onConfirm={setBirthDate}
        onCancel={() => setIsBirthPickerVisible(false)}
        maximumDate={today}
      />
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent
          type={bottomSheetType}
          onPress={console.log}
          onNavigateTo={() => navigation.navigate(CommonScreens.LEVEL_GUIDE)}
        />
      </BottomSheet>

      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        <View className="mx-5">
          <View className="mb-9 items-center pt-4">
            <Avatar
              size="large"
              source={imageResponse?.assets?.[0]?.uri ?? undefined}
              isIcon
              onPress={() => setisImagePickerVisible(true)}
            />
          </View>
          {items.inputs.map(
            ({
              id,
              name,
              label,
              placeholder,
              editable,
              control,
              inputAccessoryViewID,
            }) => (
              <View key={id} className="mb-7">
                <TextInput
                  control={control}
                  name={name}
                  placeholder={placeholder}
                  editable={editable}
                  label={label}
                  inputAccessoryViewID={inputAccessoryViewID}
                />
              </View>
            ),
          )}
          {items.inputButtons.map(
            ({id, onButtonPress, control, name, placeholder, label}) => (
              <View className="relative mb-7 flex-1" key={id}>
                <Button
                  variant="custom"
                  onPress={onButtonPress}
                  className="absolute bottom-2 z-10 w-full"
                />
                <TextInput
                  control={control}
                  name={name}
                  placeholder={placeholder}
                  className="-z-10"
                  label={label}
                />
              </View>
            ),
          )}
          <SelectButton
            type="gender"
            label="성별"
            item={REFERENCE_DATA.GENDER}
            onPress={updateSelectedOptions}
            selectedOption={selectedOptions.gender}
          />
          <SelectButton
            type="foot"
            label="주발"
            item={REFERENCE_DATA.DOMINANT_FOOT}
            onPress={updateSelectedOptions}
            selectedOption={selectedOptions.foot}
          />
        </View>
      </ScrollView>

      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button
          label="확인"
          onPress={() => Keyboard.dismiss()}
          className="rounded-none"
          isOnKeyboard
          disabled={!getValues('nickname')}
        />
      </InputAccessoryView>
      <SafeAreaView>
        <View className="flex-1">
          <Button
            label="수정 완료"
            className="absolute bottom-0 left-5 right-5 "
            float
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileEdit;
