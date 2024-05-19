import {useCallback} from 'react';
import {View} from 'react-native';
import {Button, TextInput, Container, TitleSection} from '@components/index';
import {useForm, FieldValues} from 'react-hook-form';
import useUser from '@/hooks/useUser';
import {useFocusEffect} from '@react-navigation/native';
import {AuthScreenProps, AuthScreens} from '@/types/navigationTypes';
import {containerStyle} from '@/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({
  navigation,
}: AuthScreenProps<AuthScreens.LOGIN>): JSX.Element => {
  // const {isMutating, setAuthState} = useMainContext();

  /**
   * API Calls
   */
  // const {loginQuery, getUserInfoQuery} = useUser();

  // useForm hook and set default behavior/values
  // const {...methods} = useForm({mode: 'onSubmit'});

  const {control, handleSubmit} = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FieldValues) => {};

  // const onSubmit: SubmitHandler<FieldValues> = data => {
  //   const {email, password} = data;
  //   // const email = 'tpdnrqkqh@naver.com';
  //   // const email = 'string';
  //   // const password = 'string';

  //   // loginQuery.mutate(
  //   //   {email, password},
  //   //   {
  //   //     onSuccess: () => {
  //   //       // getUserInfoQuery.mutate(undefined, {
  //   //       //   onSuccess: () => {
  //   //       //     console.log('성공!');
  //   //       //   },
  //   //       //   onError: err => {
  //   //       //     const error = err as Error;
  //   //       //     const message = error.message;
  //   //       //     if (message === '프로필 설정이 필요합니다.') {
  //   //       //       navigation.navigate('Nickname');
  //   //       //     } else {
  //   //       //       methods.setError('password', {
  //   //       //         type: 'manual',
  //   //       //         message,
  //   //       //       });
  //   //       //     }
  //   //       //   },
  //   //       // });
  //   //     },
  //   //     onError: err => {
  //   //       const error = err as Error;
  //   //       const message = error.message;

  //   //       if (message === '프로필 설정이 필요합니다.') {
  //   //         navigation.navigate('Nickname');
  //   //       } else {
  //   //         methods.setError('password', {
  //   //           type: 'manual',
  //   //           message,
  //   //         });
  //   //       }
  //   //     },
  //   //   },
  //   // );

  //   setAuthState({accessToken: null, refreshToken: null, authenticated: true});
  // };

  /**
   * TODO: Login with Sns
   */
  // const handleOnPress = () => {
  //   navigation.navigate('Nickname');
  // };

  useFocusEffect(
    useCallback(() => {
      return () => {
        control._reset();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Container>
      <TitleSection
        title="안녕하세요,"
        body="회원 서비스 이용을 위해 로그인 해주세요."
      />
      <View>
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
        />
        <TextInput
          control={control}
          name="password"
          placeholder="비밀번호"
          secureTextEntry
          rules={{required: '비밀번호를 입력해주세요.'}}
          className="mb-2"
        />
        <Button
          label="로그인"
          onPress={handleSubmit(onSubmit)}
          className="mb-3 mt-2"
        />
      </View>
      <View className="flex-row items-center justify-center">
        <Button
          label="회원가입"
          type="text"
          textType="caption"
          labelColor="text-gray-300"
          className="mr-2"
          onPress={() => navigation.navigate(AuthScreens.TERMS)}
        />
        <View className="h-1/2 w-[1px] bg-gray-300" />
        <Button
          label="비밀번호 찾기"
          type="text"
          textType="caption"
          labelColor="text-gray-300"
          className="ml-2"
          onPress={() =>
            navigation.navigate(AuthScreens.EMAIL_CHECK, {
              type: 'password',
            })
          }
        />
      </View>
    </Container>
  );
};

export default Login;
