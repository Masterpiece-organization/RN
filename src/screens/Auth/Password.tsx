import {useCallback} from 'react';
import {View} from 'react-native';
import {
  Button,
  TextInput,
  Container,
  TitleSection,
  InputAccessoryView,
} from '@/components';
import {useForm, FieldValues} from 'react-hook-form';
import {useFocusEffect} from '@react-navigation/native';
import useUser from '@/hooks/useUser';
import {
  AuthScreenProps,
  AuthScreens,
  CommonScreens,
} from '@/types/navigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';

const Password = ({
  navigation,
  route: {
    params: {email, type},
  },
}: AuthScreenProps<AuthScreens.PASSWORD>) => {
  const {signUpQuery, loginQuery} = useUser();

  const {getValues, watch, control, handleSubmit} = useForm<FieldValues>({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    if (type === 'register') {
      navigation.navigate(AuthScreens.NICKNAME_SETUP);
    } else {
      navigation.navigate(CommonScreens.SUCCESS, {type: 'resetPassword'});
    }
  };

  // const onSubmit: SubmitHandler<FieldValues> = data => {
  //   const {email, password} = data;
  //   // signUpQuery.mutate(
  //   //   {email, password},
  //   //   {
  //   //     onSuccess: () => {
  //   //       loginQuery.mutate(
  //   //         {email, password},
  //   //         {
  //   //           onSuccess: () => {
  //   //             navigation.navigate('Nickname');
  //   //           },

  //   //           onError: err => {
  //   //             const error = err as Error;
  //   //             const message = error.message;

  //   //             methods.setError('confirmPassword', {
  //   //               type: 'manual',
  //   //               message,
  //   //             });
  //   //           },
  //   //         },
  //   //       );
  //   //     },
  //   //     onError: err => {
  //   //       const error = err as Error;
  //   //       const message = error.message;

  //   //       methods.setError('confirmPassword', {
  //   //         type: 'manual',
  //   //         message,
  //   //       });
  //   //     },
  //   //   },
  //   // );

  //   navigation.navigate('Nickname');
  // };

  const inputAccessoryViewID = 'password';

  const password = watch('password');
  const confirmPassword = watch('confirm_password');

  useFocusEffect(
    useCallback(() => {
      return () => {
        control._reset();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      <Container variant="space-between">
        <View>
          <TitleSection
            title="비밀번호를 설정하세요."
            body={
              type === 'register'
                ? '비밀번호를 설정하여 회원가입을 완료하세요.'
                : '새로운 비밀번호를 입력해주세요.'
            }
          />
          <TextInput
            control={control}
            name="password"
            placeholder="비밀번호 입력 (영어+숫자 6자 이상)"
            secureTextEntry
            rules={{
              required: '',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                message: '',
              },
            }}
            className="mb-2"
          />
          <TextInput
            control={control}
            name="confirm_password"
            placeholder="비밀번호 확인"
            secureTextEntry
            rules={{
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                message: '비밀번호 필수 조건을 확인후 다시 입력해주세요.',
              },
              validate: value =>
                value === getValues('password') ||
                '입력하신 비밀번호와 일치하지 않습니다.',
            }}
            className="mb-2"
            inputAccessoryViewID={inputAccessoryViewID}
          />
        </View>

        <SafeAreaView>
          <Button
            label={type === 'register' ? '회원가입' : '비밀번호 변경하기'}
            onPress={handleSubmit(onSubmit)}
            disabled={!(password && confirmPassword)}
            // isLoading={!!contexts?.isMutating}
          />
        </SafeAreaView>
      </Container>

      <InputAccessoryView
        inputAccessoryViewID={inputAccessoryViewID}
        label={type === 'register' ? '회원가입' : '비밀번호 변경하기'}
        onPress={handleSubmit(onSubmit)}
        isDisabled={!(password && confirmPassword)}
      />
    </>
  );
};

export default Password;
