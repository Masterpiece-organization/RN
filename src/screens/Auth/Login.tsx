import {useState} from 'react';
import {SafeAreaView, Image, View} from 'react-native';
import {Button, Text, TextInput, Container} from '@components/index';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import {useMainContext} from '@/contexts/MainContext';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import useUser from '@/hooks/useUser';

// Image Source
let googleIcon = require('../../assets/icons/google.png');
let appleIcon = require('../../assets/icons/apple.png');
let kakaoIcon = require('../../assets/icons/kakao.png');

const BUTTON_DATA = [googleIcon, appleIcon, kakaoIcon];

// Type
type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: LoginScreenProps): JSX.Element => {
  const contexts = useMainContext();
  const {loginQuery} = useUser();

  // useForm hook and set default behavior/values
  const {...methods} = useForm({mode: 'onSubmit'});

  const [formError, setError] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = data => {
    // Process the submitted form data
    console.log(data.email, data.password);
    // You can use the data to perform actions like logging in, etc.

    const {email, password} = data;

    loginQuery.mutate(
      {email, password},
      {
        onSuccess: () => {
          contexts?.setUser(true);
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

  const handleOnPress = () => {
    console.log('onPress!');
  };

  return (
    <Container>
      <SafeAreaView className="flex-1">
        <SafeAreaView className="flex">
          <View className="justify-center pt-8">
            <Text className="mb-2" type="title">
              안녕하세요,
            </Text>
            <Text>회원 서비스 이용을 위해 로그인 해주세요.</Text>
          </View>
        </SafeAreaView>

        <View className="flex-1 pt-9">
          <View className="flex-row justify-center gap-x-2">
            {BUTTON_DATA.map(source => (
              <View className="flex-1" key={source}>
                <Button
                  label=""
                  onPress={handleOnPress}
                  type={
                    contexts?.colorScheme === 'dark' ? 'primary' : 'outlined'
                  }
                  buttonColor={
                    contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : ''
                  }
                  className="border-neutral-300"
                  icon={<Image source={source} className="w-6 h-6" />}
                />
              </View>
            ))}
          </View>
          <View className="relative pt-16 flex items-center justify-center">
            <View className="absolute z-10 bg-white dark:bg-black px-3">
              <Text
                textColor={
                  contexts?.colorScheme === 'dark'
                    ? 'text-white'
                    : 'text-neutral-600'
                }>
                또는
              </Text>
            </View>

            <View className="absolute h-px bg-neutral-300 w-full" />
          </View>

          <View className="form space-y-2 ">
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
                    rules={{
                      required: '이메일을 입력해주세요.',
                      pattern: {
                        value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                        message: '이메일 형식이 아닙니다.',
                      },
                    }}
                    setFormError={setError}
                    className="mb-2"
                  />
                  <TextInput
                    name="password"
                    secureTextEntry
                    placeholder="비밀번호"
                    textContentType="password"
                    rules={{required: '비밀번호를 입력해주세요.'}}
                    setFormError={setError}
                  />
                </FormProvider>
              </>
            )}
            <View className="pt-3">
              <Button
                label="로그인"
                onPress={methods.handleSubmit(onSubmit)}
                isLoading={!!contexts?.isMutating}
              />
            </View>
          </View>

          <View className="mt-7 items-center">
            <Button
              label="비밀번호를 잊으셨나요?"
              onPress={() => navigation.navigate('FindPw')}
              textColor={
                contexts?.colorScheme === 'dark'
                  ? 'text-white'
                  : 'text-neutral-600'
              }
              buttonColor=""
              type="text"
            />
          </View>
        </View>

        <View className="pb-8">
          <View className="flex-row justify-center items-center">
            <Text
              textColor={
                contexts?.colorScheme === 'dark'
                  ? 'text-white'
                  : 'text-neutral-600'
              }>
              아직 회원이 아니신가요?
            </Text>
            <Button
              label="회원가입"
              onPress={() => navigation.navigate('Terms')}
              textColor={
                contexts?.colorScheme === 'dark'
                  ? 'text-white'
                  : 'text-neutral-900'
              }
              type="text"
              buttonColor=""
              className="pl-2"
            />
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Login;
