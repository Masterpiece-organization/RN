import React from 'react';
import {View, SafeAreaView, ImageBackground, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {Text, Button} from '@/components';
import LinearGradient from 'react-native-linear-gradient';

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: HomeScreenProps) => {
  return (
    <View>
      <ImageBackground
        source={require('../../assets/images/bg.jpg')}
        resizeMode="cover"
        className="w-full h-full">
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(20,20,20,0.2)',
            'rgba(20, 20, 20, .6)',
          ]}
          style={styles.linearGradient}
          start={{x: 0.2, y: 0.4}}
          end={{x: 0.2, y: 0.9}}
          className="justify-end">
          <SafeAreaView>
            <View className="px-8 pt-8">
              <View className="justify-center">
                <Text className="mb-2" textColor="text-white" type="title">
                  {/* 축구 열정 가득한 경기를 원할 때는? "우리들만의 리그" 에서
                함께하세요! */}
                  {/* 가슴 설레는 승리의 기회,{'\n'}지금 바로{'\n'}우리들만의 리그에서 */}
                  {/* 모두 함께 축구 열기에{'\n'}열광하는 우리들만의 리그 */}
                  {/* 축구 열정 가득한{'\n'}경기를 원할 때는?{'\n'}우리들만의 리그
                에서 {'\n'}함께하세요! */}
                  {/* 모두가 하나 되어{'\n'}축구 열기에 열광하는 그곳, 우리들만의 리그 */}
                  {/* 모두가 축구로{'\n'}하나가 되는 곳,{'\n'}우리들만의 리그 */}
                  {/* 모두가 축구를 통해 하나되는 */}
                  축구로 하나가 되는{'\n'}우리들만의 리그
                </Text>
                <Text textColor="text-white">
                  지금 바로 가입하거나 로그인하여 즐거운 축구 경험을 시작하세요!
                </Text>
              </View>
            </View>
            <View className="px-8 pt-8">
              <Button
                label="시작하기"
                onPress={() => navigation.navigate('Login')}
                buttonColor="bg-black"
                className="my-4"
              />
              <Button
                label="가입하기"
                onPress={() => navigation.navigate('Terms')}
                textColor="text-black"
                buttonColor="bg-white"
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Home;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
