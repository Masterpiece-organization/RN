import {useState, useCallback} from 'react';
import {View, StyleSheet, Text as RNText} from 'react-native';
import {
  Button,
  Container,
  TitleSection,
  Text,
  InputAccessoryView,
} from '@/components';
import useUser from '@/hooks/useUser';
import useTimer from '@/hooks/useTimer';
import {useFocusEffect} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  // useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {AuthScreenProps, AuthScreen} from '@/types/navigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';

const CELL_COUNT = 5;

const defaultInputStyle =
  'items-center flex-1 aspect-square justify-center border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-950 dark:border-gray-900';

const defaultTextstyle =
  'font-titleBold text-black dark:text-white text-2xl w-full text-center';
// leading-[24px]

const VerificationNumber = ({
  navigation,
  route: {
    params: {type, email},
  },
}: AuthScreenProps<AuthScreen.VERIFICATION_NUMBER>) => {
  // API
  const {checkEmailQuery, verifyAuthCodeQuery} = useUser();

  // Timer
  const [timerOn, setTimerOn] = useState<boolean>(true);

  const [value, setValue] = useState('');
  // const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //   Verify
  const [error, setError] = useState(false);

  const inputAccessoryViewID = 'vertificationNumber';

  // Form
  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   setFocus,
  //   formState: {isValid},
  // } = useForm<FieldValues>({
  //   defaultValues: {
  //     number_0: '',
  //     number_1: '',
  //     number_2: '',
  //     number_3: '',
  //     number_4: '',
  //   },
  // });

  /**
   * TODO
   * API 이메일 인증확인
   * 인증번호 다시보내기
   */

  const onSubmit = (codes: string) => {
    // verifyAuthCodeQuery.mutate(
    //   {email, auth_number: verificationCode},
    //   {
    //     onSuccess: () => {
    //       navigation.navigate('Register', {
    //         email,
    //       });
    //     },
    //     onError: err => {
    //       const error = err as Error;

    //       const message = error.message;

    //       methods.setError('verificationCode', {
    //         type: 'manual',
    //         message,
    //       });
    //     },
    //   },
    // );

    navigation.navigate(AuthScreen.PASSWORD, {email, type});
  };

  const handleTimer = () => {
    setTimerOn(false);
    navigation.navigate(AuthScreen.EMAIL_CHECK, {type});
  };

  const {minutes, seconds} = useTimer({timerOn, handleTimer});

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimerOn(false);
        setValue('');
        // control._reset();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      <Container variant="space-between">
        <View>
          <TitleSection
            title="인증번호 입력"
            body={`입력하신 이메일로 인증번호가 전송되었습니다.\n수신된 인증번호를 입력해주세요.`}
          />

          <CodeField
            // ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            autoFocus={true}
            testID="my-code-input"
            inputAccessoryViewID={inputAccessoryViewID}
            renderCell={({index, symbol, isFocused}) => {
              return (
                <View
                  key={index}
                  className={defaultInputStyle}
                  onLayout={getCellOnLayoutHandler(index)}>
                  <RNText
                    className={`${defaultTextstyle} ${
                      isFocused ? 'mb-1.5' : ''
                    }`}>
                    {symbol ||
                      (isFocused ? (
                        <RNText className=" w-full font-bodyNormal text-2xl text-gray-700">
                          <Cursor />
                        </RNText>
                      ) : null)}
                  </RNText>
                </View>
              );
            }}
          />

          <View className="mt-3">
            <Text type="caption" color="text-gray-300">
              3분 이내로 인증번호를 입력해 주세요.
            </Text>
            <View className="mt-1 flex-row">
              <Text
                type="caption"
                weight="bold"
                color="text-gray-700 dark:color-white">
                유효시간:
              </Text>
              <Text type="caption" weight="bold" color="text-primary">
                {timerOn
                  ? ` ${minutes}:${
                      seconds === 0
                        ? '00'
                        : seconds < 10
                        ? `0${seconds}`
                        : seconds
                    }`
                  : ' 0:00'}
              </Text>
            </View>
          </View>
          {error && (
            <Text color="text-red" type="caption" className="mt-1">
              입력하신 인증번호가 일치 하지 않습니다.
            </Text>
          )}
        </View>
        <SafeAreaView className="items-center">
          <View className="mb-2 flex-row items-center">
            <Text color="text-gray-300" type="caption">
              인증번호를 받지 못하셨나요?
            </Text>
            <Button type="text">
              <Text
                className="underline underline-offset-4"
                color="text-gray-300"
                type="caption">
                인증번호 다시보내기
              </Text>
            </Button>
          </View>

          <Button
            label="다음"
            onPress={() => onSubmit(value)}
            disabled={value.length !== 5}
            className="w-full"
          />
        </SafeAreaView>
      </Container>

      <InputAccessoryView
        inputAccessoryViewID={inputAccessoryViewID}
        label="다음"
        onPress={() => onSubmit(value)}
        isDisabled={value.length !== 5}
      />
    </>
  );
};

export default VerificationNumber;

const styles = StyleSheet.create({
  codeFieldRoot: {gap: 8},
});
