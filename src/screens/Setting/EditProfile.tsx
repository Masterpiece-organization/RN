import {Avatar, Container, Card, TextInput, Text, Button} from '@/components';
import {View, Pressable} from 'react-native';
import {useState} from 'react';
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

type EditScreenProps = StackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfile = ({navigation}: EditScreenProps) => {
  const contexts = useMainContext();
  const colorScheme = contexts?.colorScheme;
  const fillColor = colorBasedOnTheme(colorScheme, 'white', '#121212');

  const {...methods} = useForm({mode: 'onSubmit'});
  const [formError, setError] = useState<Boolean>(false);

  return (
    <Container horizontal className={`${defaultMargin}`}>
      <Card className="items-center rounded-lg px-5">
        <Avatar
          className="h-24 w-24"
          //   pickerResponse={pickerResponse}
          //   handleOnPress={handleImagePickerModal}
        />
        <FormProvider {...methods}>
          <TextInput
            name="nickname"
            keyboardType="default"
            textContentType="emailAddress"
            // rules={{
            //   required: '이메일을 입력해주세요.',
            //   pattern: {
            //     value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
            //     message: '이메일 형식이 아닙니다.',
            //   },
            // }}
            value="테스트"
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
          onPress={() => navigation.navigate('Position')}>
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
