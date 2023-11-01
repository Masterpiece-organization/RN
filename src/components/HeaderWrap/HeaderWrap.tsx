import Header from '../Header/Header';
import {SafeAreaView, Dimensions} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Setting from '@/assets/icons/setting.svg';
import {useMainContext} from '@/contexts/MainContext';
import {HeaderDataType, GetHeaderDataType} from './HeaderWrap.type';
import {Button} from '@/components';
import useTheme from '@/hooks/useTheme';

const HeaderWrap = ({...props}: NativeStackHeaderProps) => {
  const contexts = useMainContext();
  const {bgTheme} = useTheme();
  const {blackAndWhite} = bgTheme();

  const {
    route: {name, params: routeParams},
    navigation,
  } = props;

  const castedRouteParams = routeParams as Record<string, unknown> | undefined;

  const getHeaderData = ({
    colorScheme,
    params,
  }: GetHeaderDataType): Record<string, HeaderDataType> => {
    const resetPasswordCondition =
      typeof params === 'object' &&
      params !== null &&
      params['someKey'] === 'resetPassword';

    let SettingName;
    if (params?.page) {
      switch (params?.page) {
        case 'theme':
          SettingName = '테마';
          break;
        case 'notification':
          SettingName = '푸시알림설정';
          break;
        case 'terms':
          SettingName = '개인정보설정';
          break;
        default:
          SettingName = '설정';
      }
    }

    return {
      Login: {
        left: true,
        border: false,
      },
      Terms: {
        left: true,
        border: true,
        center: '회원가입',
        animatingWidthValues: [0, Dimensions.get('window').width * 0.1666],
      },
      CheckEmail: {
        left: true,
        border: true,
        center: '회원가입',
        animatingWidthValues: [0, Dimensions.get('window').width * 0.3333],
      },
      Register: {
        left: true,
        border: true,
        center: '회원가입',
        animatingWidthValues: [0, Dimensions.get('window').width * 0.5],
      },
      Nickname: {
        left: true,
        border: true,
        center: '회원가입',
        animatingWidthValues: [0, Dimensions.get('window').width * 0.6666],
      },
      Position: {
        left: true,
        border: true,
        center: '회원가입',
        animatingWidthValues: [0, Dimensions.get('window').width * 0.8333],
      },
      Success: {
        left: false,
        center: resetPasswordCondition ? '비밀번호 찾기' : '회원가입',
        border: true,
        animatingWidthValues: [0, Dimensions.get('window').width * 1],
      },
      FindPw: {
        left: true,
        border: true,
        center: '비밀번호 찾기',
        animatingWidthValues: [0, Dimensions.get('window').width * 0.3],
      },
      ResetPw: {
        left: true,
        border: true,
        center: '비밀번호 찾기',
        animatingWidthValues: [0, Dimensions.get('window').width * 0.6],
      },
      My: {
        left: false,
        border: true,
        center: '마이페이지',
        right: (
          <Button
            label=""
            onPress={() => navigation.navigate('Setting')}
            buttonColor=""
            className="h-6"
            icon={
              <Setting color={colorScheme === 'dark' ? 'white' : '#404040'} />
            }
          />
        ),
      },
      Setting: {
        left: true,
        border: true,
        center: '설정',
      },
      SettingDetail: {
        left: true,
        border: true,
        center: SettingName,
      },
      EditProfile: {
        left: true,
        border: true,
        center: '프로필 수정',
      },
      MatchHistory: {
        left: true,
        border: true,
        center: '경기이력',
      },
    };
  };

  const headerData = getHeaderData({
    colorScheme: contexts?.colorScheme,
    params: castedRouteParams,
  })[name];

  return (
    <SafeAreaView className={blackAndWhite}>
      <Header {...headerData} {...props} />
    </SafeAreaView>
  );
};

export default HeaderWrap;
