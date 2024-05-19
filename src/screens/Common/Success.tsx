import {Button, Text} from '@components/index';
import {
  AuthScreenProps,
  AuthScreens,
  CommonScreens,
  MainScreens,
  MainScreenProps,
} from '@/types/navigationTypes';
import {Image, View} from 'react-native';
import {containerStyle} from '@/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMGS} from '@/constants';

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

const Success = ({
  navigation,
  route: {params},
}: AuthScreenProps<CommonScreens.SUCCESS> &
  MainScreenProps<CommonScreens.SUCCESS>) => {
  return (
    <View className={containerStyle('detail')}>
      <View className="-mt-20 flex-1 items-center justify-center">
        <View>
          <Image source={IMGS.success} />
        </View>
        <View className="mt-9">
          <Text type="display" className="text-center">
            {params.type === 'register'
              ? SUCCESS_DATA.register.title
              : SUCCESS_DATA.resetPassword.title}
          </Text>
        </View>
      </View>

      <SafeAreaView>
        <Button
          label={
            params.type === 'register' ? '메인으로 이동하기' : '로그인 하기'
          }
          onPress={() => {
            params.type === 'register'
              ? navigation.navigate(MainScreens.MAIN)
              : navigation.navigate(AuthScreens.LOGIN);
          }}
          className="mb-lg"
        />
      </SafeAreaView>
    </View>
  );
};

export default Success;
