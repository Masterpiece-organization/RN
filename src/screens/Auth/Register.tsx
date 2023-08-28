import {useEffect, useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {Button, Text, TextInput, Container} from '@components/index';
import {useMainContext} from '@/contexts/MainContext';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import useUser from '@/hooks/useUser';

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

const Register = ({navigation, route}: RegisterScreenProps) => {
  const contexts = useMainContext();
  const {signUpQuery} = useUser();

  // useForm hook and set default behavior/values
  const {...methods} = useForm({mode: 'onSubmit'});

  const watchingPassword = methods.watch('password');

  const [formError, setError] = useState<Boolean>(false);
  const [param, setParam] = useState<string>('');

  const onSubmit: SubmitHandler<FieldValues> = data => {
    // Process the submitted form data
    console.log(data.email, data.authentication);
    // You can use the data to perform actions like logging in, etc.
    console.log(data);
    // const {email, password} = data;

    // signUpQuery.mutate(
    //   {email, password},
    //   {
    //     onSuccess: () => {
    //       navigation.navigate('Success');
    //     },
    //     onError: () => {
    //       methods.setError('confirmPassword', {
    //         type: 'manual',
    //         message: '에러',
    //       });
    //     },
    //   },
    // );

    navigation.navigate('Success', {
      name: 'register',
    });
  };

  useEffect(() => {
    if (route.params?.email) {
      setParam(route.params?.email);
    }
  }, [route.params?.email]);

  return (
    <Container>
      <SafeAreaView className="flex">
        <View className="justify-center pt-8 ">
          <Text className="mb-3" textColor="text-neutral-400" type="title">
            <Text type="title" className="text-bold">
              이메일과 비밀번호
            </Text>
            만으로{'\n'}
            <Text className="text-bold" type="title">
              우리들만의 리그 를 즐길 수
            </Text>{' '}
            있어요!
          </Text>
        </View>
      </SafeAreaView>

      <View className="flex-1 pt-9">
        <View className="form -mt-2">
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
                  name="email"
                  placeholder="이메일 주소"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={param}
                  setFormError={setError}
                  className="mb-2"
                  editable={false}
                />

                <TextInput
                  name="password"
                  secureTextEntry
                  placeholder="비밀번호"
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
                  placeholder="비밀번호 확인"
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
              label="회원가입"
              // onPress={() => navigation.navigate('RegisterSuccess')}
              onPress={methods.handleSubmit(onSubmit)}
              isLoading={!!contexts?.isMutating}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Register;
