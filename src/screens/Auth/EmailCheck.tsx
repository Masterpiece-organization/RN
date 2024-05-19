import {View, InputAccessoryView} from 'react-native';
import {Container, TextInput, Button, TitleSection} from '@/components';
import {useForm, SubmitHandler, FieldValues} from 'react-hook-form';
import useUser from '@/hooks/useUser';
import {AuthScreenProps, AuthScreens} from '@/types/navigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';

const EmailCheck = ({
  navigation,
  route: {
    params: {type},
  },
}: AuthScreenProps<AuthScreens.EMAIL_CHECK>) => {
  const inputAccessoryViewID = 'email';

  const {checkEmailQuery, verifyAuthCodeQuery} = useUser();

  const {...methods} = useForm({mode: 'onSubmit'});

  // const checkEmail: SubmitHandler<FieldValues> = data => {
  //   const {email} = data;

  //   checkEmailQuery.mutate(
  //     {email},
  //     {
  //       onSuccess: () => {
  //         setTimerOn(true);
  //       },
  //       onError: err => {
  //         const error = err as Error;

  //         const message = error.message;

  //         methods.setError('email', {
  //           type: 'manual',
  //           message,
  //         });
  //       },
  //     },
  //   );
  // };

  // const onSubmit: SubmitHandler<FieldValues> = data => {
  //   const {email, verificationCode} = data;

  //   // verifyAuthCodeQuery.mutate(
  //   //   {email, auth_number: verificationCode},
  //   //   {
  //   //     onSuccess: () => {
  //   //       navigation.navigate('Register', {
  //   //         email,
  //   //       });
  //   //     },
  //   //     onError: err => {
  //   //       const error = err as Error;

  //   //       const message = error.message;

  //   //       methods.setError('verificationCode', {
  //   //         type: 'manual',
  //   //         message,
  //   //       });
  //   //     },
  //   //   },
  //   // );

  //   navigation.navigate('Register', {
  //     email,
  //   });
  // };

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    navigation.navigate(AuthScreens.VERIFICATION_NUMBER, {
      email: data.email,
      type,
    });
  };

  return (
    <>
      <Container variant="space-between">
        <View>
          <TitleSection
            title={
              type === 'register' ? '안녕하세요!' : '비밀번호를 잊으셨나요?'
            }
            body={
              type === 'register'
                ? `우리들만의 리그에 오신 것을 환영합니다!\n가입을 위해 이메일 인증을 진행해주세요.`
                : '등록하신 이메일 주소로 인증번호를 요청하여 비밀번호를 재설정 하실 수 있습니다.'
            }
          />

          <TextInput
            control={control}
            name="email"
            placeholder="이메일 주소"
            keyboardType="email-address"
            rules={{
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            }}
            className="mb-2"
            inputAccessoryViewID={inputAccessoryViewID}
          />
        </View>
        <SafeAreaView>
          <Button
            label="인증번호 요청"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </SafeAreaView>
      </Container>

      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button
          label="인증번호 요청"
          onPress={handleSubmit(onSubmit)}
          className="rounded-none"
          isOnKeyboard
          disabled={!isValid}
        />
      </InputAccessoryView>
    </>
  );
};

export default EmailCheck;
