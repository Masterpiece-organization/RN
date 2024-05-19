import {
  Platform,
  ScrollView,
  View,
  SafeAreaView,
  InputAccessoryView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, TitleSection, TextInput} from '@/components';
import {useForm, FieldValues} from 'react-hook-form';
import {StyledKeyboardHideIcon} from '@/constants/icons';

const GuestAnnouncementInputs = () => {
  const {control} = useForm<FieldValues>({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const inputAccessoryViewID = 'annoucement';

  return (
    <>
      <ScrollView contentContainerStyle={{flex: 1}} className="mx-5">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          keyboardVerticalOffset={64}>
          <View className="mb-10 mt-4 flex-1">
            <TitleSection
              title={'경기 공지사항을 작성해주세요.'}
              body={
                '경기에 참여할 용병들에게 알려야 할 공지사항이 있다면, 여기에 자세히 작성해주세요.'
              }
            />
            <TextInput
              control={control}
              name="annoucement"
              placeholder="경기 상세정보 입력"
              className="flex-1 py-3"
              multiline
              inputAccessoryViewID={inputAccessoryViewID}
              returnKeyType="next"
            />
          </View>

          <SafeAreaView>
            <Button label={'완료'} />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>

      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View className=" flex-row border-t border-t-gray-50 bg-white dark:border-t-gray-700 dark:bg-gray-950">
          <View className="w-full items-end">
            <TouchableOpacity
              className="rounded-none p-4"
              onPress={() => Keyboard.dismiss()}>
              <StyledKeyboardHideIcon className="color-gray-300" />
            </TouchableOpacity>
          </View>
        </View>
      </InputAccessoryView>
    </>
  );
};

export default GuestAnnouncementInputs;
