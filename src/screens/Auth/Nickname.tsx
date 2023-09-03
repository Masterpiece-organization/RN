import {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {Button, Text, TextInput, Container} from '@components/index';
import {useMainContext} from '@/contexts/MainContext';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import {nouns, adjectives} from '@/data/nickname';

type NicknameScreenProps = StackScreenProps<RootStackParamList, 'Nickname'>;

const Nickname = ({navigation}: NicknameScreenProps) => {
  const contexts = useMainContext();

  const {...methods} = useForm({mode: 'onSubmit'});

  const [formError, setError] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const {nickname} = data;

    navigation.navigate('Position', {
      nickname,
    });
  };

  const createNickname = () => {
    const idx1 = Math.floor(Math.random() * adjectives.length);
    const idx2 = Math.floor(Math.random() * nouns.length);

    // setRandomName(adjectives[idx1] + nouns[idx2]);
    methods.setValue('nickname', adjectives[idx1] + nouns[idx2]);
  };

  return (
    <Container>
      <SafeAreaView className="flex">
        <View className="justify-center pt-8 ">
          <Text type="title" className="text-bold mb-3">
            닉네임 정하기
          </Text>
          <Text
            textColor={
              contexts?.colorScheme === 'dark'
                ? 'text-white'
                : 'text-neutral-600'
            }>
            우리들만의 리그에서 불릴 멋진 닉네임을 정해주세요.
          </Text>
        </View>
      </SafeAreaView>

      <View className="flex-1 pt-9">
        <View className="form -mt-2">
          {formError ? (
            <View>
              <Text textColor="text-red">
                문제가생겼습니다. 잠시후 다시 시도해주세요.
              </Text>
            </View>
          ) : (
            <>
              <FormProvider {...methods}>
                <TextInput
                  name="nickname"
                  placeholder="닉네임"
                  setFormError={setError}
                  className="mb-2"
                  rules={{required: '닉네임을 입력해주세요.'}}
                />
              </FormProvider>
            </>
          )}

          <View className="pt-3">
            <Button
              label="닉네임 설정"
              onPress={methods.handleSubmit(onSubmit)}
              isLoading={!!contexts?.isMutating}
              className="mb-2"
            />
            <Button
              label="랜덤 닉네임 생성"
              onPress={createNickname}
              isLoading={!!contexts?.isMutating}
              type="outlined"
              buttonColor={
                contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : ''
              }
              className="border-neutral-300"
              textColor={
                contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : ''
              }
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Nickname;
