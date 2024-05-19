import {View, SafeAreaView, Image, ImageBackground} from 'react-native';
import {Button, TitleSection, Text} from '@/components';
import {AuthScreenProps, AuthScreens} from '@/types/navigationTypes';
import {IMGS} from '@/constants';

const BUTTONS = [
  {
    title: 'Apple로 로그인',
    icon: IMGS.appleIcon,
    textColor: 'text-white',
    className: 'relative mb-2 bg-gray-950 active:bg-black',
    onPress: () => console.log,
  },
  {
    title: '구글로 로그인',
    icon: IMGS.googleIcon,
    textColor: 'text-black',
    className: 'relative mb-2 bg-white active:bg-gray-50',
    onPress: () => console.log,
  },
  {
    title: '카카오로 로그인',
    icon: IMGS.kakaoIcon,
    textColor: 'text-black',
    className: 'relative mb-2 bg-[#F8DD5F] active:bg-yellow',
    onPress: () => console.log,
  },
  {
    title: '이메일로 로그인 • 회원가입',
    icon: IMGS.snsIcon,
    textColor: 'text-white',
    className: 'relative bg-primary active:bg-primaryActive',
    onPress: () => console.log,
  },
];

const OnBoarding = ({navigation}: AuthScreenProps<AuthScreens.ONBOARDING>) => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={IMGS.onboard_bg}
        resizeMode="cover"
        className="h-full w-full">
        <SafeAreaView className="mx-[15px] flex-1 justify-between">
          <TitleSection
            title={'축구로 하나가 되는\n우리들만의 리그'}
            body={
              '지금 바로 가입하거나 로그인하여\n즐거운 축구 경험을 시작하세요!'
            }
            color="text-white"
            className="mt-[60px]"
          />
          <View>
            {BUTTONS.map(({title, icon, textColor, className, onPress}) => {
              return (
                <Button
                  variant="custom"
                  className={className}
                  key={title}
                  onPress={
                    title === '이메일로 로그인 • 회원가입'
                      ? () => navigation.navigate(AuthScreens.LOGIN)
                      : onPress
                  }>
                  <Image
                    source={icon}
                    className="absolute left-5 h-[24px] w-[24px]"
                  />
                  <Text color={textColor} weight="medium">
                    {title}
                  </Text>
                </Button>
              );
            })}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default OnBoarding;
