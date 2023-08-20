import React from 'react';
import {SafeAreaView, Image, View} from 'react-native';
import {Button, Text, TextInput} from '@components/index';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import {useMainContext} from '@/context/MainContext';

let googleIcon = require('../../assets/icons/google.png');
let appleIcon = require('../../assets/icons/apple.png');
let kakaoIcon = require('../../assets/icons/kakao.png');

const BUTTON_DATA = [googleIcon, appleIcon, kakaoIcon];
type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: LoginScreenProps): JSX.Element => {
  const handleOnPress = () => {
    console.log('onPress!');
  };

  const contexts = useMainContext();

  return (
    <SafeAreaView className="flex-1 ">
      <SafeAreaView className="flex">
        <View className="justify-center px-8 pt-8">
          <Text className="mb-2" type="title">
            안녕하세요,
          </Text>
          <Text>회원 서비스 이용을 위해 로그인 해주세요.</Text>
        </View>
      </SafeAreaView>

      <View className="flex-1 px-8 pt-9">
        <View className="flex-row justify-center gap-x-2">
          {BUTTON_DATA.map(source => (
            <View className="flex-1">
              <Button
                label=""
                onPress={handleOnPress}
                type={contexts?.colorScheme === 'dark' ? 'primary' : 'outlined'}
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
          <View className="pt-3">
            <Button
              label="로그인"
              onPress={handleOnPress}
              textColor="text-white"
              buttonColor={
                contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-black'
              }
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
  );
};

export default Login;
