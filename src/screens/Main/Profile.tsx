import {View, SafeAreaView, Image} from 'react-native';
import {Text, Container, Button} from '@/components';
import {User as ProfileIcon} from '@/assets/icons/iconComponents';
import {useMainContext} from '@/contexts/MainContext';
import CameraIcon from '@/assets/icons/camera.svg';
import {Field as MatchesIcon} from '@/assets/icons/iconComponents';
import BallIcon from '@/assets/icons/ball.svg';

const Profile = () => {
  const contexts = useMainContext();

  const handleOnPress = () => {
    console.log('onPress!');
  };
  return (
    <Container>
      <SafeAreaView className="flex">
        <View className="mt-4 py-4 px-5 bg-neutral-800">
          <View className="flex-row items-center">
            <View className="rounded-full bg-neutral-600 p-6 justify-center items-center mr-6">
              <ProfileIcon strokeColor="white" />
              <Button
                label=""
                onPress={handleOnPress}
                buttonColor={
                  // contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : ''
                  'bg-orange-400'
                }
                className="absolute -right-1 bottom-0 rounded-full h-7 w-7 border-2 border-white dark:border-neutral-800"
                icon={<CameraIcon color="white" />}
              />
            </View>
            <View>
              <Text type="subtitle" className="mb-2">
                지네딘 지단
              </Text>
              <View className="flex-row gap-2">
                <View>
                  <Text type="bodySmall" textColor="text-neutral-400">
                    ST
                  </Text>
                </View>
                <View>
                  <Text type="bodySmall" textColor="text-neutral-400">
                    CAM
                  </Text>
                </View>
                <View>
                  <Text type="bodySmall" textColor="text-neutral-400">
                    CM
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <View className="mt-4 bg-neutral-800 py-4 px-5">
          <View className="border-b-neutral-600 pb-2 border-b flex-row justify-between items-center">
            <Text>경기이력</Text>
            <View className="flex-row">
              <View className="mr-3">
                <MatchesIcon
                  width={24}
                  height={24}
                  strokeColor={
                    contexts?.colorScheme === 'dark' ? 'white' : '#121212'
                  }
                />
              </View>
              <View>
                <BallIcon
                  color={contexts?.colorScheme === 'dark' ? 'white' : '#121212'}
                />
              </View>
            </View>
          </View>
          <View className="pt-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="rounded-full bg-neutral-600 p-4 mr-4" />
              <Text>팀명</Text>
            </View>
            <View className="flex-row mr-1">
              <Text
                className="w-8 text-right"
                type="bodySmall"
                textColor="text-neutral-400">
                24
              </Text>
              <Text
                className="w-8 text-right"
                type="bodySmall"
                textColor="text-neutral-400">
                12
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Profile;
