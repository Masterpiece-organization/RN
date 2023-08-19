import React from 'react';
import Header from '../Header/Header';
import {SafeAreaView, Dimensions} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Text} from 'react-native';

const HeaderWrap = ({...props}: NativeStackHeaderProps) => {
  const {
    route: {name},
  } = props;

  let animatingWidthValues;
  let right;
  let border;

  if (name === 'Terms') {
    animatingWidthValues = [0, Dimensions.get('window').width * 0.5];
    right = <Text className="text-neutral-600">1 of 2</Text>;
    border = true;
  }
  if (name === 'Register') {
    animatingWidthValues = [0, Dimensions.get('window').width * 1];
    right = <Text className="text-neutral-600">2 of 2</Text>;
    border = true;
  }

  return (
    <SafeAreaView className="bg-white dark:bg-black">
      <Header
        animatingWidthValues={animatingWidthValues}
        right={right}
        border={border}
        {...props}
      />
    </SafeAreaView>
  );
};

export default HeaderWrap;
