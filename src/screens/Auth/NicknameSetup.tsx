import {View} from 'react-native';
import {
  Button,
  TextInput,
  Container,
  TitleSection,
  InputAccessoryView,
} from '@components/index';
import {useForm, FieldValues} from 'react-hook-form';
import {nouns, adjectives} from '@/data/nickname';
import {
  AuthScreenProps,
  AuthScreens,
  CommonScreens,
} from '@/types/navigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';

const NicknameSetup = ({
  navigation,
}: AuthScreenProps<AuthScreens.NICKNAME_SETUP>) => {
  // const onSubmit: SubmitHandler<FieldValues> = data => {
  //   const {nickname} = data;

  //   navigation.navigate('Position', {
  //     nickname,
  //   });
  // };

  const {setValue, watch, control, handleSubmit} = useForm<FieldValues>({
    defaultValues: {
      nickName: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    // navigation.navigate('Position', {nickName: data.nickName});
    navigation.navigate(CommonScreens.POSITION_SETUP, {
      nickName: data.nickName,
    });
  };

  const watchNickname = watch('nickName', '');

  const createNickname = () => {
    const idx1 = Math.floor(Math.random() * adjectives.length);
    const idx2 = Math.floor(Math.random() * nouns.length);

    setValue('nickName', adjectives[idx1] + nouns[idx2]);
  };

  const inputAccessoryViewID = 'nickName';

  return (
    <>
      <Container variant="space-between">
        <View className="flex-1">
          <TitleSection
            title="닉네임 정해주세요."
            body="우리들만의 리그에서 불릴 멋진 닉네임을 정해주세요."
          />
          <TextInput
            control={control}
            name="nickName"
            placeholder="닉네임 입력"
            rules={{
              required: '닉네임을 입력해주세요.',
            }}
            className="mb-2"
            inputAccessoryViewID={inputAccessoryViewID}
          />
        </View>
        <SafeAreaView>
          <Button
            label="닉네임 설정"
            onPress={handleSubmit(onSubmit)}
            // isLoading={!!isMutating}
            className="mb-2"
            disabled={!watchNickname || watchNickname.trim() === ''}
          />
          <Button
            label="랜덤 닉네임 생성"
            variant="secondary"
            onPress={createNickname}
            // isLoading={!!isMutating}
          />
        </SafeAreaView>
      </Container>

      <InputAccessoryView
        inputAccessoryViewID={inputAccessoryViewID}
        label="닉네임 설정"
        onPress={handleSubmit(onSubmit)}
        isDisabled={!watchNickname || watchNickname.trim() === ''}
      />
    </>
  );
};

export default NicknameSetup;
