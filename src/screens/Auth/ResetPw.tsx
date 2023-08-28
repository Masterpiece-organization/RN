import {View, SafeAreaView} from 'react-native';
import {useState} from 'react';
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

type ResetPwScreenProps = StackScreenProps<RootStackParamList, 'ResetPw'>;

const ResetPw = ({navigation}: ResetPwScreenProps) => {
  const contexts = useMainContext();

  // useForm hook and set default behavior/values
  const {...methods} = useForm({mode: 'onSubmit'});

  const watchingPassword = methods.watch('password');

  const [formError, setError] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = data => {
    // Process the submitted form data
    console.log(data.email, data.authentication);
    // You can use the data to perform actions like logging in, etc.
    navigation.navigate('Success', {
      name: 'resetPassword',
    });
  };

  return (
    <Container>
      <SafeAreaView className="flex">
        <View className="justify-center pt-8 ">
          <Text className="mb-2" type="subtitle">
            새로운 비밀번호를 설정해주세요.
          </Text>
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
          <Text type="small" textColor="text-neutral-400" className="mt-2">
            비밀번호는 대소문자, 숫자, 특수문자를 혼합하여 6~20자로
            입력해주세요.
          </Text>
          <View className="pt-3">
            <Button
              label="변경하기"
              onPress={methods.handleSubmit(onSubmit)}
              textColor="text-white"
              buttonColor={
                contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-black'
              }
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ResetPw;
