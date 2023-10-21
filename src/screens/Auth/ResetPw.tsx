import {View} from 'react-native';
import {useState, useEffect} from 'react';
import {
  Text,
  Button,
  TextInput,
  Container,
  TitleSection,
} from '@components/index';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import useUser from '@/hooks/useUser';
import {defaultMargin} from '@/theme';

type ResetPwScreenProps = StackScreenProps<RootStackParamList, 'ResetPw'>;

const ResetPw = ({navigation, route}: ResetPwScreenProps) => {
  const {resetPasswordQuery} = useUser();

  // useForm hook and set default behavior/values
  const {...methods} = useForm({mode: 'onSubmit'});

  const watchingPassword = methods.watch('password');

  const [formError, setError] = useState<Boolean>(false);
  const [param, setParam] = useState<string>('');

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const {password} = data;
    const email = param;

    resetPasswordQuery.mutate(
      {email, password},
      {
        onSuccess: () => {
          navigation.navigate('Success', {
            name: 'resetPassword',
          });
        },
        onError: () => {
          methods.setError('confirmPassword', {
            type: 'manual',
            message: '에러',
          });
        },
      },
    );
  };

  useEffect(() => {
    if (route.params?.email) {
      setParam(route.params?.email);
    }
  }, [route.params?.email]);

  return (
    <Container className={defaultMargin}>
      <TitleSection
        title="비밀번호를 설정하세요."
        body="새로운 비밀번호를 설정해주세요."
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
                <TextInput
                  name="password"
                  placeholder="새 비밀번호"
                  secureTextEntry
                  rules={{
                    required: '비밀번호를 입력해주세요.',
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
                      message: '비밀번호 필수 조건을 확인후 다시 입력해주세요.',
                    },
                  }}
                  setFormError={setError}
                  className="mb-2"
                />
                <TextInput
                  name="confirmPassword"
                  secureTextEntry
                  placeholder="새 비밀번호 확인"
                  rules={{
                    required: '비밀번호를 입력해주세요.',
                    validate: value =>
                      value === watchingPassword ||
                      '입력하신 비밀번호와 일치하지 않습니다.',
                  }}
                  setFormError={setError}
                />
              </FormProvider>
            </>
          )}
          <Text type="bodySmall" textColor="text-neutral-400" className="mt-2">
            비밀번호는 영어 대소문자, 숫자, 특수만자를 혼합하여 6~20자로
            입력해주세요.
          </Text>
          <View className="pt-3">
            <Button
              label="변경하기"
              onPress={methods.handleSubmit(onSubmit)}
              textColor="text-white"
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ResetPw;
