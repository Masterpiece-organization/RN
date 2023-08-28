import React from 'react';

import {View, StyleSheet} from 'react-native';
import {Text} from '@components/index';
interface ErrorType {
  error?: string;
}

const Error = ({error}: ErrorType) => (
  <View style={style.container}>
    {error && (
      <Text className="text-red-600" type="small">
        {error}
      </Text>
    )}
  </View>
);

const style = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Error;
