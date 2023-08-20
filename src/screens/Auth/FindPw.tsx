import {View, SafeAreaView} from 'react-native';
import {Text, Button, TextInput} from '@components/index';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import {useMainContext} from '@/context/MainContext';

type FindPwScreenProps = StackScreenProps<RootStackParamList, 'FindPw'>;

const FindPw = ({navigation}: FindPwScreenProps) => {
  const contexts = useMainContext();

  return (
    <SafeAreaView className="dark:bg-black">
      <SafeAreaView className="flex">
        <View className="justify-center px-8 pt-8 ">
          <Text className="mb-2" type="subtitle">
            비밀번호를 잊으셨나요?
          </Text>
          <Text>등록하신 이메일 주소로 비밀번호를 재설정하실 수 있습니다.</Text>
        </View>
      </SafeAreaView>

      <View className="px-8 pt-9">
        <View className="form space-y-2 -mt-2">
          <TextInput
            placeholder="이메일 주소"
            placeholderTextColor="#9ca3af"
            // error="에러메시지"
          />
          <TextInput
            placeholder="인증번호"
            placeholderTextColor="#9ca3af"
            // error="에러메시지"
          />
          <View className="pt-3">
            <Button
              label="다음"
              onPress={() => navigation.navigate('ResetPw')}
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

export default FindPw;
