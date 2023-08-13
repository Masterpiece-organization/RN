import React from 'react';
import {Text, View, Button} from 'react-native';
const Home = ({navigation}: any) => {
  return (
    <View>
      <Text>
        축구 열정 가득한 경기를 원할 때는? "우리들만의 리그"에서 함께하세요!
      </Text>
      <Text>
        지금 바로 가입하거나 로그인하여 즐거운 축구 경험을 시작하세요!
      </Text>
      <Button title="시작하기" onPress={() => navigation.navigate('Login')} />
      <Button title="가입하기" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default Home;
