import {
  View,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import {
  Text,
  Container,
  Button,
  Avatar,
  ImagePickerModal,
  Card,
} from '@/components';
import {useMainContext} from '@/contexts/MainContext';
import {Field as MatchesIcon} from '@/assets/icons/iconComponents';
import BallIcon from '@/assets/icons/ball.svg';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import useCamera from '@/hooks/useCamera';
import {ImagePickerResponse} from 'react-native-image-picker';
import {colorBasedOnTheme} from '@/theme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {defaultMargin} from '@/theme';

const DATA = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Third Item',
  },
  {
    id: '5',
    title: 'Third Item',
  },
  {
    id: '6',
    title: 'Third Item',
  },
  {
    id: '7',
    title: 'Third Item',
  },
  {
    id: '8',
    title: 'Third Item',
  },
];

const ScreenWidth = Dimensions.get('window').width; // 현재 화면의 너비 가져오기
const OneQuarterWidth = ScreenWidth / 6; // 현재 화면 너비의 1/4

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({navigation}: ProfileScreenProps) => {
  const contexts = useMainContext();
  const colorScheme = contexts?.colorScheme;
  const fillColor = colorBasedOnTheme(colorScheme, 'white', '#121212');

  const handleOnPress = () => {
    console.log('onPress!');
  };

  const renderItem = ({index}: {index: number}) => {
    return (
      <View
        className={`rounded-full border border-neutral-600 ${
          index === DATA.length - 1 ? 'mr-8' : 'mr-4'
        }`}
        style={{width: OneQuarterWidth, height: OneQuarterWidth}}>
        <Image
          source={require('@/assets/images/logo.png')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
    );
  };

  const [pickerResponse, setPickerResponse] =
    useState<ImagePickerResponse | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImagePickerModal = () => {
    setIsModalVisible(true);
  };

  const {onImageGalleryClick, onCameraPress} = useCamera({
    setPickerResponse,
    setIsModalVisible,
  });

  // async function SendImageToAPI(base64, type) {
  //   if (
  //     type === 'image/jpeg' ||
  //     type === 'image/png' ||
  //     type === 'image/jpg' ||
  //     type === 'image/webp' ||
  //     type === 'image/gif'
  //   ) {
  //     /**
  //      * TODO: send an image to db
  //      */
  //   } else {
  //     /**
  //      * TODO: handle error
  //      */
  //   }
  // }

  // async function getUserImage() {
  //   try {
  //     /**
  //      * TODO: get an image from db
  //      * call setImageFromDB after getting an image form db
  //      */
  //     // setImageFromDB(response.data.imageAsBase64);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // const createThreeButtonAlert = () =>
  //   Alert.alert('프로필 이미지 설정', '', [
  //     {
  //       text: '사진 찍기',
  //       onPress: () => onImageGalleryClick,
  //     },
  //     {
  //       text: '앨범에서 선택하기',
  //       onPress: () => onCameraPress,
  //     },
  //   ]);

  return (
    <Container horizontal className={`${defaultMargin}`}>
      <ImagePickerModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onImageLibraryPress={onImageGalleryClick}
        onCameraPress={onCameraPress}
      />
      <SafeAreaView className="flex">
        <Pressable onPress={() => navigation.navigate('EditProfile')}>
          <Card className="flex-row items-center justify-between rounded-lg px-5">
            <View className="flex-row items-center">
              <Avatar
                className="mr-6 h-16 w-16"
                pickerResponse={pickerResponse}
                handleOnPress={handleImagePickerModal}
              />
              <View>
                <Text type="subtitle" className="mb-2">
                  지네딘 지단
                </Text>
                <View className="flex-row gap-2">
                  <View>
                    <Text type="bodySmall" textColor="text-neutral-400">
                      ST / CAM / CM
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <ArrowRightIcon color="#A3A3A3" width={24} />
          </Card>
        </Pressable>
      </SafeAreaView>
      <View>
        <Card
          className="rounded-lg"
          title="경기이력"
          titleButton={
            <View className="flex-row">
              <View className="mr-3">
                <MatchesIcon width={20} height={20} strokeColor={fillColor} />
              </View>
              <View>
                <BallIcon width={20} height={20} color={fillColor} />
              </View>
            </View>
          }>
          <View className="px-5 pt-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-4 h-8 w-8 rounded-full border border-neutral-600">
                  <Image
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <Text>맨체스터 시티</Text>
              </View>
              <View className="mr-1 flex-row">
                <Text
                  className="w-8 text-right"
                  type="bodySmall"
                  textColor="text-neutral-400">
                  32
                </Text>
                <Text
                  className="w-8 text-right"
                  type="bodySmall"
                  textColor="text-neutral-400">
                  12
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between pt-3">
              <View className="flex-row items-center">
                <View className="mr-4 h-8 w-8 rounded-full border border-neutral-600 ">
                  <Image
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <Text>맨체스터 시티</Text>
              </View>
              <View className="mr-1 flex-row">
                <Text
                  className="w-8 text-right"
                  type="bodySmall"
                  textColor="text-neutral-400">
                  17
                </Text>
                <Text
                  className="w-8 text-right"
                  type="bodySmall"
                  textColor="text-neutral-400">
                  6
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card
          className="rounded-lg"
          title="나의 소속팀"
          titleButton={
            <Button
              className=""
              textSize="text-sm"
              label="팀 찾기"
              onPress={console.log}
              type="text"
              buttonColor=""
              textColor="text-neutral-400"
              icon={
                <View className="-mr-2">
                  <ArrowRightIcon color="#A3A3A3" width={20} />
                </View>
              }
            />
          }>
          <View className="pt-3">
            <FlatList
              className="px-4"
              data={DATA}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </Card>
      </View>
    </Container>
  );
};

export default Profile;
