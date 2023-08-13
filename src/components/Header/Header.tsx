import React from 'react';
import {HeaderType} from './Header.type';
import {View, Text, useColorScheme} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import ArrowLeftIcon from '@/assets/icons/nav_arrow_left.svg';

import Button from '../Button';

const Header = ({
  center,
  right,
  ...props
}: HeaderType & NativeStackHeaderProps) => {
  //   const [left, center, right] = children;

  const colorScheme = useColorScheme();

  console.log(props);

  const {
    route: {name},
    navigation,
  } = props;

  console.log(name);

  return (
    <View className="px-5">
      <View>
        <Button
          label=""
          icon={
            <ArrowLeftIcon
              color={colorScheme === 'dark' ? 'white' : 'black'}
              width={28}
              height={28}
            />
          }
          onPress={() => navigation.goBack()}
          //   textColor="text-neutral-600"
          type="text"
        />
      </View>
      <View>
        <Text>{center}</Text>
      </View>
      <View>{right}</View>
    </View>
  );
};

export default Header;
