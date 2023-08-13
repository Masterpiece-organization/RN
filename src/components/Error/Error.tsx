import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import scaleFont from '@/utils/scaleFont';
interface ErrorType {
  error?: string;
}

const Error = ({error}: ErrorType) => (
  <View style={style.container}>
    {error && <Text style={style.text}>{error}</Text>}
  </View>
);

const style = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 4,
    marginLeft: 4,
  },
  text: {
    fontSize: scaleFont(12),
    color: '#f00',
  },
});

export default Error;
