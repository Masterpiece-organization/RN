import {useState, useCallback} from 'react';
import {View} from 'react-native';
import {Container, Text, TextInput, Button} from '@/components';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import {useMainContext} from '@/contexts/MainContext';
import useUser from '@/hooks/useUser';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import useTimer from '@/hooks/useTimer';
import {useFocusEffect} from '@react-navigation/native';

export type CheckEmailScreenProps = StackScreenProps<
  RootStackParamList,
  'CheckEmail'
>;

const CheckEmail = ({navigation}: CheckEmailScreenProps) => {
  const contexts = useMainContext();
  const {checkEmailQuery, verifyAuthCodeQuery} = useUser();

  const {...methods} = useForm({mode: 'onSubmit'});

  const [formError, setError] = useState<boolean>(false);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  const {minutes, seconds} = useTimer({timerOn, setTimerOn});

  const checkEmail: SubmitHandler<FieldValues> = data => {
    const {email} = data;

    checkEmailQuery.mutate(
      {email},
      {
        onSuccess: () => {
          setTimerOn(true);
        },
        onError: err => {
          const error = err as Error;

          const message =
            error.message === 'email already exists.'
              ? '이미 존재하는 이메일입니다.'
              : error.message;

          methods.setError('email', {
            type: 'manual',
            message,
          });
        },
      },
    );
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const {email, verificationCode} = data;

    verifyAuthCodeQuery.mutate(
      {email, auth_number: verificationCode},
      {
        onSuccess: () => {
          navigation.navigate('Register', {
            email,
          });
        },
        onError: err => {
          const error = err as Error;

          const message =
            error.message ===
            'Verfiy resource is not found or expied of auth code'
              ? '인증코드가 틀렸습니다. 다시 입력해 주세요!'
              : error.message;

          methods.setError('verificationCode', {
            type: 'manual',
            message,
          });
        },
      },
    );
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimerOn(false);
        methods.reset({});
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Container>
      <View className="justify-center pt-8">
        <Text type="title" className="text-bold mb-3">
          이메일 인증하기
        </Text>
        <Text
          textColor={
            contexts?.colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
          }>
          우리들만의 리그에 오신 것을 환영합니다!{`\n`}
          가입을 위해 이메일 인증을 진행해주세요.
        </Text>
      </View>
      <View className="flex-1 pt-9">
        <View className="form space-y-2 -mt-2">
          {formError ? (
            <View>
              <Text textColor="text-red">
                문제가생겼습니다. 잠시후 다시 시도해주세요.
              </Text>
            </View>
          ) : (
            <>
              <FormProvider {...methods}>
                <View className="flex-row items-starti">
                  <TextInput
                    name="email"
                    placeholder="이메일 주소"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    rules={{
                      required: '이메일을 입력해주세요.',
                      pattern: {
                        value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                        message: '이메일 형식이 아닙니다.',
                      },
                    }}
                    setFormError={setError}
                    className="mb-2 w-3/4"
                    editable={timerOn ? false : true}
                  />
                  <Button
                    label={
                      timerOn
                        ? `${minutes}:${
                            seconds === 0
                              ? '00'
                              : seconds < 10
                              ? `0${seconds}`
                              : seconds
                          }`
                        : '인증요청'
                    }
                    onPress={methods.handleSubmit(checkEmail)}
                    textColor="text-white"
                    textSize="text-xs"
                    className="flex-auto ml-2 h-12"
                    isLoading={!timerOn && !!contexts?.isMutating}
                    disabled={timerOn}
                  />
                </View>

                {timerOn && (
                  <TextInput
                    name="verificationCode"
                    placeholder="인증번호"
                    keyboardType="number-pad"
                    rules={{
                      required: '인증번호를 입력해 주세요.',
                    }}
                    setFormError={setError}
                    className="mb-2"
                  />
                )}
              </FormProvider>
            </>
          )}

          <View className="pt-3">
            {timerOn && (
              <Button
                label="확인"
                onPress={
                  // () =>
                  //   navigation.navigate('Register', {
                  //     email: methods.getValues().email,
                  //   })
                  methods.handleSubmit(onSubmit)
                }
                textColor="text-white"
                isLoading={timerOn && !!contexts?.isMutating}
              />
            )}
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CheckEmail;
