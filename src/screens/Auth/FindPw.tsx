import {View} from 'react-native';
import {useState, useCallback} from 'react';
import {
  Text,
  Button,
  TextInput,
  Container,
  TitleSection,
} from '@components/index';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import {useMainContext} from '@/contexts/MainContext';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import useTimer from '@/hooks/useTimer';
import {useFocusEffect} from '@react-navigation/native';
import useUser from '@/hooks/useUser';
import {defaultMargin} from '@/theme';

type FindPwScreenProps = StackScreenProps<RootStackParamList, 'FindPw'>;

const FindPw = ({navigation}: FindPwScreenProps) => {
  const contexts = useMainContext();
  const {checkEmailPasswordQuery, verifyAuthCodeQuery} = useUser();

  // useForm hook and set default behavior/values
  const {...methods} = useForm({mode: 'onSubmit'});

  const [formError, setError] = useState<boolean>(false);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  const {minutes, seconds} = useTimer({timerOn, setTimerOn});

  const checkEmail: SubmitHandler<FieldValues> = data => {
    const {email} = data;

    checkEmailPasswordQuery.mutate(
      {email},
      {
        onSuccess: () => {
          setTimerOn(true);
        },
        onError: err => {
          const error = err as Error;

          const message =
            error.message === 'USER_NOT_FOUN'
              ? '존재하지 않는 이메일입니다.'
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
          navigation.navigate('ResetPw', {
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
    <Container className={defaultMargin}>
      <TitleSection
        title="비밀번호를 잊으셨나요?"
        body="등록하신 이메일 주소로 인증번호를 요청하여 비밀번호를 재설정 하실 수 있습니다."
      />
      <View>
        <View className="form space-y-2">
          {formError ? (
            <View>
              <Text textColor="text-red">
                문제가생겼습니다. 잠시후 다시 시도해주세요.
              </Text>
            </View>
          ) : (
            <>
              <FormProvider {...methods}>
                <View className="items-starti flex-row">
                  <TextInput
                    name="email"
                    placeholder="이메일 주소"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    rules={{
                      required: '이메일을 입력해주세요.',
                      pattern: {
                        value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                        message: '잘못된 유형의 이메일 주소입니다.',
                      },
                    }}
                    setFormError={setError}
                    className="mb-2 w-3/4"
                    editable={timerOn ? false : true}
                  />
                  <Button
                    label={
                      timerOn
                        ? `${minutes}:${seconds === 0 ? '00' : seconds}`
                        : '인증요청'
                    }
                    onPress={methods.handleSubmit(checkEmail)}
                    textColor="text-white"
                    textSize="text-xs"
                    className="ml-2 h-[52px] flex-auto"
                    isLoading={!timerOn && !!contexts?.isMutating}
                    disabled={timerOn}
                    type="dark"
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
                onPress={methods.handleSubmit(onSubmit)}
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

export default FindPw;
