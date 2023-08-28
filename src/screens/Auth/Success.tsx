import {View, SafeAreaView} from 'react-native';
import {Text, Button} from '@components/index';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import {useMainContext} from '@/contexts/MainContext';

type SuccessScreenProps = StackScreenProps<RootStackParamList, 'Success'>;

type SuccessDataTypes = {
  [key: string]: {
    title: string;
    body: string;
  };
};

const SUCCESS_DATA: SuccessDataTypes = {
  resetPassword: {
    title: '비밀번호가 성공적으로 변경되었습니다.',
    body: '지금부터 변경된 비밀번호로 우리들만의 리그를 이용해 주시기 바랍니다.',
  },
  register: {
    title: '회원가입이 완료되었습니다!',
    body: '지금 바로 우리들만의 리그를 이용해보세요.',
  },
};

const Success = ({navigation, route}: SuccessScreenProps) => {
  const contexts = useMainContext();

  const {
    params: {name},
  } = route;

  const selectedSuccessData = SUCCESS_DATA[name];

  return (
    <SafeAreaView className="dark:bg-black">
      <SafeAreaView className="flex">
        <View className="justify-center px-8 pt-8 ">
          <Text className="mb-2" type="title">
            {selectedSuccessData.title}
          </Text>
          <Text>{selectedSuccessData.body}</Text>
        </View>
      </SafeAreaView>
      <View className="px-8 pt-9">
        <Button
          label="홈으로"
          onPress={() => navigation.navigate('Home')}
          textColor="text-white"
          buttonColor={
            contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-black'
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Success;
