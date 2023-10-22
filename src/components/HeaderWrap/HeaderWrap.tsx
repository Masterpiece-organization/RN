import React from 'react';
import Header from '../Header/Header';
import {SafeAreaView, Dimensions} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Setting from '@/assets/icons/setting.svg';
import {useMainContext} from '@/contexts/MainContext';
import {HeaderDataType, GetHeaderDataType} from './HeaderWrap.type';
import Button from '../Button';

const HeaderWrap = ({...props}: NativeStackHeaderProps) => {
  const contexts = useMainContext();

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
        border: false,
        center: '마이페이지',
        right: (
          <Button
            label=""
            onPress={() => navigation.navigate('Setting')}
            buttonColor=""
            className="h-6"
            icon={
              <Setting color={colorScheme === 'dark' ? 'white' : 'black'} />
            }
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
    };
  };

  const headerData = getHeaderData({
    colorScheme: contexts?.colorScheme,
    params: castedRouteParams,
  })[name];

  return (
    <SafeAreaView className="bg-white dark:bg-black">
      <Header {...headerData} {...props} />
    </SafeAreaView>
  );
};

export default HeaderWrap;
