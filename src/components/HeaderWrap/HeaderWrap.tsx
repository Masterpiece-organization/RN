import React from 'react';
import Header from '../Header/Header';
import Text from '../Text';
import {SafeAreaView, Dimensions} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Setting from '@/assets/icons/setting.svg';
import {useMainContext} from '@/contexts/MainContext';
import {HeaderDataType, GetHeaderDataType} from './HeaderWrap.type';
import Button from '../Button';

const HeaderWrap = ({...props}: NativeStackHeaderProps) => {
  const contexts = useMainContext();

  const {
    route: {name},
    navigation,
  } = props;

  const getHeaderData = ({
    colorScheme,
  }: GetHeaderDataType): Record<string, HeaderDataType> => ({
    Login: {
      left: true,
      border: false,
    },
    Terms: {
      left: true,
      border: true,
      center: '서비스 이용 동의 및 확인',
      animatingWidthValues: [0, Dimensions.get('window').width * 0.333],
      right: <Text type="bodySmall">1 of 3</Text>,
    },
    CheckEmail: {
      left: true,
      border: true,
      center: '이메일 확인',
      animatingWidthValues: [0, Dimensions.get('window').width * 0.666],
      right: <Text type="bodySmall">2 of 3</Text>,
    },
    Register: {
      left: true,
      border: true,
      center: '회원가입',
      animatingWidthValues: [0, Dimensions.get('window').width * 1],
      right: <Text type="bodySmall">3 of 3</Text>,
    },
    FindPw: {
      left: true,
      border: true,
      center: '비밀번호 재설정',
      animatingWidthValues: [0, Dimensions.get('window').width * 0.5],
      right: <Text type="bodySmall">1 of 2</Text>,
    },
    ResetPw: {
      left: true,
      border: true,
      center: '비밀번호 재설정',
      animatingWidthValues: [0, Dimensions.get('window').width * 1],
      right: <Text type="bodySmall">2 of 2</Text>,
    },
    RegisterSuccess: {
      left: true,
    },
    My: {
      left: false,
      border: false,
      center: 'My',
      right: (
        <Button
          label=""
          onPress={() => navigation.navigate('Setting')}
          buttonColor=""
          className="h-6"
          icon={<Setting color={colorScheme === 'dark' ? 'white' : 'black'} />}
        />
      ),
    },
    Setting: {
      left: true,
      border: false,
      center: '설정',
    },
    EditProfile: {
      left: true,
      border: false,
      center: '프로필 수정',
    },
  });

  const headerData = getHeaderData({colorScheme: contexts?.colorScheme})[name];

  return (
    <SafeAreaView className="bg-white dark:bg-black">
      <Header {...headerData} {...props} />
    </SafeAreaView>
  );
};

export default HeaderWrap;
