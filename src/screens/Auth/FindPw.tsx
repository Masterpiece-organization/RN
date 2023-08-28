import {View, SafeAreaView} from 'react-native';
import {useState, useCallback} from 'react';
import {Text, Button, TextInput, Container} from '@components/index';
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

type FindPwScreenProps = StackScreenProps<RootStackParamList, 'FindPw'>;

const FindPw = ({navigation}: FindPwScreenProps) => {
  const contexts = useMainContext();

  // useForm hook and set default behavior/values
  const {...methods} = useForm({mode: 'onSubmit'});

  const [formError, setError] = useState<boolean>(false);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  const {minutes, seconds} = useTimer({timerOn, setTimerOn});

  const checkEmail: SubmitHandler<FieldValues> = data => {
    // Process the submitted form data
    console.log(data.email, data.authentication);

    setTimerOn(true);
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    // Process the submitted form data
    console.log(data.email, data.authentication);

    navigation.navigate('ResetPw');
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimerOn(false);
        methods.reset({});
      };
    }, []),
  );

  return (
    <Container>
      <SafeAreaView className="flex">
        <View className="justify-center pt-8 ">
          <Text className="mb-2" type="subtitle">
            비밀번호를 잊으셨나요?
          </Text>
          <Text>등록하신 이메일 주소로 비밀번호를 재설정하실 수 있습니다.</Text>
        </View>
      </SafeAreaView>

      <View className="pt-9">
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
                        ? `${minutes}:${seconds === 0 ? '00' : seconds}`
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
