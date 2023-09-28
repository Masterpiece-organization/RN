import {
  Avatar,
  Container,
  Card,
  TextInput,
  Text,
  Button,
  ImagePickerModal,
} from '@/components';
import {View, Pressable} from 'react-native';
import {useEffect, useState} from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import {useMainContext} from '@/contexts/MainContext';
import {
  colorBasedOnTheme,
  defaultMargin,
  elementBackgroundStyle,
} from '@/theme';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {ImagePickerResponse} from 'react-native-image-picker';
import useCamera from '@/hooks/useCamera';

type EditScreenProps = StackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfile = ({navigation}: EditScreenProps) => {
  const contexts = useMainContext();
  const colorScheme = contexts?.colorScheme;
  const fillColor = colorBasedOnTheme(colorScheme, 'white', '#121212');

  const {...methods} = useForm({mode: 'onSubmit'});
  const [formError, setError] = useState<Boolean>(false);

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

  useEffect(() => {
    methods.setValue('nickname', '테스트');
  }, []);

  return (
    <Container horizontal className={`${defaultMargin}`}>
      <ImagePickerModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onImageLibraryPress={onImageGalleryClick}
        onCameraPress={onCameraPress}
      />
      <Card className="items-center rounded-lg px-5">
        <Avatar
          className="h-24 w-24"
          iconClassName="w-10 h-10"
          pickerResponse={pickerResponse}
          handleOnPress={handleImagePickerModal}
          disabled={false}
        />
        <FormProvider {...methods}>
          <TextInput
            name="nickname"
            keyboardType="default"
            textContentType="nickname"
            rules={{
              required: '닉네임을 입력해주세요.',
            }}
            setFormError={setError}
            className="mb-2 mt-5 w-full"
            textAlign="center"
          />
          <Text type="small" className="ml-2 mt-1">
            프로필 사진과 닉네임을 입력해주세요.
          </Text>
        </FormProvider>
      </Card>
      <Card className="rounded-lg">
        <Pressable
          className="-mr-1 flex-row justify-between px-5"
          onPress={() =>
            navigation.navigate('Position', {
              nickname: 'test',
              position: '1',
            })
          }>
          <View className="flex-row">
            <Text className="mr-3">선호포지션</Text>
            <Text className="text-neutral-400">ST / CAM / CM </Text>
          </View>

          <ArrowRightIcon color={fillColor} />
        </Pressable>
      </Card>
      <Button
        label="수정"
        onPress={() => console.log}
        isLoading={!!contexts?.isMutating}
        className="mt-5"
      />
    </Container>
  );
};

export default EditProfile;
