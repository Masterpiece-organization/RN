import {
  View,
  SafeAreaView,
  InputAccessoryView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Button, TextInput, TitleSection} from '@/components';
import {useForm, FieldValues} from 'react-hook-form';
import {StyledKeyboardHideIcon} from '@/constants/icons';

const MatchAnnouncementInputs = () => {
  const {getValues, watch, control, handleSubmit} = useForm<FieldValues>({
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
              title={'경기 상세정보를 작성해주세요.'}
              body={
                '이 정보는 상대방이 경기에 대해 더 잘 이해하고, 준비하는 데 도움이 됩니다.'
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
        <View className=" flex-row border-t border-t-gray-50 bg-white">
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

export default MatchAnnouncementInputs;
