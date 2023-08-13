import React, {PropsWithChildren} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView, Image, View, useColorScheme} from 'react-native';
// import {themeColors} from '@/theme';
import {Button, Text, TextInput} from '@components/index';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = PropsWithChildren<{
  navigation: LoginScreenNavigationProp;
}>;

const Login = ({navigation}: Props): JSX.Element => {
  const handleOnPress = () => {
    console.log('onPress!');
  };

  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <SafeAreaView className="flex">
        <View className="justify-center px-8 pt-8">
          <Text classStyle="mb-2" type="title">
            안녕하세요,
          </Text>
          <Text>회원 서비스 이용을 위해 로그인 해주세요.</Text>
        </View>
      </SafeAreaView>

      <View className="flex-1 px-8 pt-9">
        <View className="flex-row justify-center gap-x-2">
          <View className="flex-1">
            <Button
              label=""
              onPress={handleOnPress}
              type={colorScheme === 'dark' ? '' : 'outlined'}
              buttonColor={
                colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-300'
              }
              icon={
                <Image
                  source={require('../../assets/icons/google.png')}
                  className="w-6 h-6"
                />
              }
            />
          </View>
          <View className="flex-1">
            <Button
              label=""
              onPress={handleOnPress}
              type={colorScheme === 'dark' ? '' : 'outlined'}
              buttonColor={
                colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-300'
              }
              icon={
                <Image
                  source={require('../../assets/icons/apple.png')}
                  className="w-6 h-6 blur"
                />
              }
            />
          </View>
          <View className="flex-1">
            <Button
              label=""
              onPress={handleOnPress}
              type={colorScheme === 'dark' ? '' : 'outlined'}
              buttonColor={
                colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-300'
              }
              icon={
                <Image
                  source={require('../../assets/icons/kakao.png')}
                  className="w-6 h-6"
                />
              }
            />
          </View>
        </View>
        <View className="relative pt-16 flex items-center justify-center">
          <View className="absolute z-10 bg-white dark:bg-black px-3">
            <Text
              textColor={
                colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
              }>
              또는
            </Text>
          </View>

          <View className="absolute h-px bg-neutral-300 w-full" />
        </View>

        <View className="form space-y-2 -mt-2">
          <TextInput
            placeholder="이메일 주소"
            placeholderTextColor="#9ca3af"
            // error="에러메시지"
          />
          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="#9ca3af"
            // error="에러메시지"
          />
          <View>
            <Button
              label="로그인"
              onPress={handleOnPress}
              textColor="text-white"
              buttonColor={
                colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-black'
              }
            />
          </View>
        </View>

        <View className="mt-7 items-center">
          <Button
            label="비밀번호를 잊으셨나요?"
            onPress={handleOnPress}
            textColor={
              colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
            }
            type="text"
          />
        </View>
      </View>

      <View className="pb-8">
        <View className="flex-row justify-center items-center">
          <Text
            textColor={
              colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
            }>
            아직 회원이 아니신가요?
          </Text>
          <Button
            label="회원가입"
            onPress={handleOnPress}
            textColor={
              colorScheme === 'dark' ? 'text-white' : 'text-neutral-900'
            }
            type="text"
            customButtonStyle="pl-2"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
