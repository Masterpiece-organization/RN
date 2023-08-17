import React from 'react';
import Header from '../Header/Header';
import {SafeAreaView, Dimensions} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const HeaderWrap = ({...props}: NativeStackHeaderProps) => {
  return (
    <SafeAreaView className="bg-white dark:bg-black">
      <Header
        animatingWidthValues={[0, Dimensions.get('window').width * 0.25]}
        {...props}
      />
    </SafeAreaView>
  );
};

export default HeaderWrap;
