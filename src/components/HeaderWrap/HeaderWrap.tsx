import React from 'react';
import Header from '../Header/Header';
import Text from '../Text';
import {SafeAreaView, Dimensions} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useMainContext} from '@/context/MainContext';

const HeaderWrap = ({...props}: NativeStackHeaderProps) => {
  const contexts = useMainContext();

  const {
    route: {name},
  } = props;

  let animatingWidthValues;
  let left;
  let center;
  let right;
  let border;

  /**
   * TODO!!!! Simplify the code, deleting Text in center and right component
   */

  if (name === 'Terms' || name === 'FindPw') {
    animatingWidthValues = [0, Dimensions.get('window').width * 0.5];
    left = true;
    center = (
      <Text
        className={`${
          contexts?.colorScheme === 'dark' ? 'text-white' : 'text-black'
        }`}>
        {name === 'Terms' ? '서비스 이용 동의 및 확인' : '비밀번호 재설정'}
      </Text>
    );
    right = (
      <Text
        className={`${
          contexts?.colorScheme === 'dark' ? 'text-white' : 'text-black'
        }`}>
        1 of 2
      </Text>
    );
    border = true;
  }
  if (name === 'Register' || name === 'ResetPw') {
    animatingWidthValues = [0, Dimensions.get('window').width * 1];
    left = true;
    center = (
      <Text
        className={`${
          contexts?.colorScheme === 'dark' ? 'text-white' : 'text-black'
        }`}>
        {name === 'Register' ? '회원가입' : '비밀번호 재설정'}
      </Text>
    );
    right = (
      <Text
        className={`${
          contexts?.colorScheme === 'dark' ? 'text-white' : 'text-black'
        }`}>
        2 of 2
      </Text>
    );
    border = true;
  }
  if (name === 'RegisterSuccess') {
    left = false;
  }

  return (
    <SafeAreaView className="bg-white dark:bg-black">
      <Header
        animatingWidthValues={animatingWidthValues}
        left={left}
        center={center}
        right={right}
        border={border}
        {...props}
      />
    </SafeAreaView>
  );
};

export default HeaderWrap;
