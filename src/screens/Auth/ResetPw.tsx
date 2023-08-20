import {View, SafeAreaView} from 'react-native';
import {Text, Button, TextInput} from '@components/index';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import {useMainContext} from '@/context/MainContext';

type ResetPwScreenProps = StackScreenProps<RootStackParamList, 'ResetPw'>;

const ResetPw = ({navigation}: ResetPwScreenProps) => {
  const contexts = useMainContext();
  return (
    <SafeAreaView className="dark:bg-black">
      <SafeAreaView className="flex">
        <View className="justify-center px-8 pt-8 ">
          <Text className="mb-2" type="subtitle">
            새로운 비밀번호를 설정해주세요.
          </Text>
        </View>
      </SafeAreaView>

      <View className="px-8 pt-9">
        <View className="form space-y-2 -mt-2">
          <TextInput
            placeholder="새 비밀번호"
            placeholderTextColor="#9ca3af"
            // error="에러메시지"
          />
          <TextInput
            placeholder="새 비밀번호 확인"
            placeholderTextColor="#9ca3af"
            // error="에러메시지"
          />
          <View className="pt-3">
            <Button
              label="변경하기"
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

export default ResetPw;
