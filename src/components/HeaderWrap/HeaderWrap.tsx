import React from 'react';
import Header from '../Header/Header';
import {SafeAreaView} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const HeaderWrap = ({...props}: NativeStackHeaderProps) => {
  return (
    <SafeAreaView className="bg-white dark:bg-black">
      <Header {...props} />
    </SafeAreaView>
  );
};

export default HeaderWrap;
