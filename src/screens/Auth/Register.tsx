import React from 'react';
import {View, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {Button, Text, TextInput, Wrap} from '@components/index';
import {useMainContext} from '@/context/MainContext';

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

const Register = ({navigation}: RegisterScreenProps) => {
  const contexts = useMainContext();

  return (
    <SafeAreaView className="dark:bg-black">
      <SafeAreaView className="flex">
        <View className="justify-center px-8 pt-8 ">
          <Text className="mb-2" textColor="text-neutral-400" type="subtitle">
            <Text type="subtitle" className="text-bold">
              이메일과 비밀번호
            </Text>
            만으로{'\n'}
            <Text type="subtitle" className="text-bold">
              우리들만의 리그 를 즐길 수
            </Text>{' '}
            있어요!
          </Text>
        </View>
      </SafeAreaView>

      <View className="flex-1 px-8 pt-9">
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
          <TextInput
            placeholder="비밀번호 확인"
            placeholderTextColor="#9ca3af"
            // error="에러메시지"
          />
          <Text type="bodySmall" textColor="text-neutral-400">
            비밀번호는 영문 대소문자, 숫자, 특수문자를 혼합하여 6~20자로
            입력해주세요.
          </Text>
          <View className="pt-3">
            <Button
              label="회원가입"
              onPress={() => navigation.navigate('RegisterSuccess')}
              textColor="text-white"
              buttonColor={
                contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-black'
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
