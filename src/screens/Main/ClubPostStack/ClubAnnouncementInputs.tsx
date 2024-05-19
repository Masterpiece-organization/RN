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

const ClubAnnouncementInputs = () => {
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
              title={
                '새 팀원이 알아야 할 중요한 정보가 있다면 여기에 적어주세요.'
              }
            />
            <TextInput
              control={control}
              name="title"
              placeholder="팀원 모집글 제목 입력"
              className="mb-2 mt-3"
            />
            <TextInput
              control={control}
              name="annoucement"
              placeholder="모집글 상세정보 입력"
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

export default ClubAnnouncementInputs;
