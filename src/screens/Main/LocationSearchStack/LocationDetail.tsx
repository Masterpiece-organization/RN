import {InputAccessoryView, View} from 'react-native';
import {Text, TextInput, Container, Button} from '@/components';
import {
  useForm,
  // FormProvider,
  // SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyledMapIcon, StyledRightIcon} from '@/constants/icons';
import {
  LocationSearchScreens,
  LocationSearchScreenProps,
  MatchPostScreens,
  CommonScreens,
} from '@/types/navigationTypes';

const LocationDetail = ({
  route: {params},
  navigation,
}: LocationSearchScreenProps<LocationSearchScreens.LOCATION_DETAIL>) => {
  const inputAccessoryViewID = 'location';
  const {control, handleSubmit, watch} = useForm<FieldValues>({
    defaultValues: {
      detail_address: '',
    },
  });
  const detailedAddress = watch('detail_address');

  console.log(params);
  const onSubmit = () => {
    navigation.navigate(MatchPostScreens.MATCH_LOCATION_SELECTION);
  };

  return (
    <>
      <Container variant="space-between">
        <View>
          <Text className="mb-1" weight="bold" type="header">
            {params.data.structured_formatting.main_text}
          </Text>
          <View className="mb-5">
            <View className="mt-1 flex-row items-center">
              <View className="mr-2 rounded-full bg-gray-50 px-1.5 py-1 dark:bg-gray-950">
                <Text
                  color="text-gray-700 dark:text-gray-300 text-xs"
                  weight="semibold">
                  도로명
                </Text>
              </View>
              <Text
                color="text-gray-700 dark:text-gray-300 flex-1"
                weight="medium">
                {params.data.structured_formatting.secondary_text}
              </Text>
            </View>
          </View>

          <TextInput
            control={control}
            name="detail_address"
            placeholder="상세 주소 입력"
            inputAccessoryViewID={inputAccessoryViewID}
          />

          <Button
            type="text"
            // variant="custom"
            className="mt-1 h-[54px] flex-row items-center justify-between"
            onPress={() =>
              navigation.navigate(CommonScreens.MAP_SCREEN, {
                type: 'posting',
                latitude: params.details.geometry.location.lat,
                longitude: params.details.geometry.location.lng,
              })
            }>
            <View className="flex-row">
              <StyledMapIcon className="color-gray-300 dark:color-gray-700 mr-2" />
              <Text className="ml-xs" weight="medium">
                지도에서 위치 확인
              </Text>
            </View>

            <StyledRightIcon
              width={16}
              height={16}
              className="color-gray-200 dark:color-gray-700 mr-2"
            />
          </Button>
        </View>

        <SafeAreaView>
          <Button
            label="완료"
            onPress={handleSubmit(onSubmit)}
            disabled={!detailedAddress}
            // isLoading={!!contexts?.isMutating}
          />
        </SafeAreaView>
      </Container>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button
          label={'완료'}
          onPress={handleSubmit(onSubmit)}
          className="rounded-none"
          isOnKeyboard
          disabled={!detailedAddress}
        />
      </InputAccessoryView>
    </>
  );
};

export default LocationDetail;
