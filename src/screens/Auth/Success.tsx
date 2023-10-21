import {Button, Container, TitleSection} from '@components/index';
import {
  RootStackParamList,
  MainRootTabsParamList,
} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import {defaultMargin} from '@/theme';

type SuccessScreenProps = StackScreenProps<
  RootStackParamList & MainRootTabsParamList,
  'Success'
>;

type SuccessDataTypes = {
  [key: string]: {
    title: string;
    body: string;
  };
};

const SUCCESS_DATA: SuccessDataTypes = {
  resetPassword: {
    title: '새로운 비밀번호 설정이\n완료되었습니다!',
    body: '지금바로 우리들의 리그를 이용해보세요.',
  },
  register: {
    title: '회원가입이 완료되었습니다!',
    body: '지금바로 우리들의 리그를 이용해보세요.',
  },
};

const Success = ({navigation, route}: SuccessScreenProps) => {
  const {
    params: {name},
  } = route;

  const selectedSuccessData = SUCCESS_DATA[name];

  return (
    <Container className={`${defaultMargin} justify-between`}>
      <TitleSection
        title={selectedSuccessData.title}
        body={selectedSuccessData.body}
      />
      <Button
        label="메인으로"
        onPress={() => {
          name === 'resetPassword'
            ? navigation.navigate('Login')
            : navigation.navigate('Main');
        }}
        textColor="text-white"
        className="mb-lg"
      />
    </Container>
  );
};

export default Success;
