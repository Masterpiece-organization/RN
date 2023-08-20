import React from 'react';

import {ActivityIndicator, View, StyleSheet} from 'react-native';

import {styled} from 'nativewind';

interface LoaderType {
  color?: [{color: string | undefined}];
}

const Loader = ({color = [{color: '#000000'}]}: LoaderType) => {
  return (
    <View style={style.container}>
      <ActivityIndicator size="small" color={color[0]?.color} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default styled(Loader, {
  props: {
    color: true,
  },
});
