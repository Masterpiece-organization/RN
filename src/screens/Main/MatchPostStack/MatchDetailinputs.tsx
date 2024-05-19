import {useState, useCallback} from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  BottomSheet,
  BottomSheetContent,
  Button,
  Container,
  TextInput,
  Text,
  TitleSection,
} from '@/components';
import {useForm, FieldValues} from 'react-hook-form';
import {
  MatchPostScreens,
  MatchPostScreenProps,
  CommonScreens,
} from '@/types/navigationTypes';
import {ContentTypes} from '@/constants/bottomSheetData';
import useBottomSheet from '@/hooks/useBottomSheet';

const GENDER = ['남자', '여자', '혼성'];

const MatchDetailinputs = ({
  navigation,
  route: {
    params: {type},
  },
}: MatchPostScreenProps<MatchPostScreens.MATCH_DETAIL_INPUTS>) => {
  const {bottomSheetRef, open} = useBottomSheet();

  const [bottomSheetType, setBottomSheetType] = useState<
    ContentTypes | undefined
  >();

  const {control} = useForm<FieldValues>({
    defaultValues: {
      location: '',
    },
  });

  const handleBottomModal = useCallback(type => {
    setBottomSheetType(type);
    open();
  }, []);

  return (
    <>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent
          type={bottomSheetType}
          onPress={console.log}
          onNavigateTo={() => navigation.navigate(CommonScreens.LEVEL_GUIDE)}
        />
      </BottomSheet>

      <Container variant="space-between">
        <View>
          <TitleSection
            title={
              type === 'public'
                ? '경기세부 조건을 알려주세요.'
                : '경기 인원을 알려주세요.'
            }
            body={
              type === 'public'
                ? '아래의 정보를 바탕으로 원하는 상대방과의 매치를 만들 수 있어요.'
                : '아래 정보를 기반으로 원하는 인원으로 매치를 구성할 수 있습니다.'
            }
          />
          <View>
            <View className="relative mb-7">
              <Button
                variant="custom"
                onPress={() => handleBottomModal('team_size')}
                className="absolute bottom-0 z-10 w-full"
              />
              <TextInput
                control={control}
                name="team_size"
                placeholder="경기인원 입력"
                className="-z-10"
                label="경기인원"
              />
            </View>
            {type === 'public' && (
              <>
                <View className="relative mb-7">
                  <Button
                    variant="custom"
                    onPress={() => handleBottomModal('level')}
                    className="absolute bottom-0 z-10 w-full"
                  />
                  <TextInput
                    control={control}
                    name="level"
                    placeholder="경기 희망 레벨 선택"
                    className="-z-10"
                    label="레벨"
                  />
                </View>
                <View className="mb-7">
                  <Text color="text-gray-800" className="mb-2">
                    성별
                  </Text>
                  <View className="flex-row space-x-2">
                    {GENDER.map(itemLabel => (
                      <View className="flex-1" key={itemLabel}>
                        <Button
                          type="outlined"
                          label={itemLabel}
                          labelColor="text-gray-200"
                        />
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}

            <View className="relative mb-2">
              <TextInput
                control={control}
                name="match_fee"
                keyboardType="number-pad"
                placeholder="참가비 입력"
                className="-z-10"
                label="참가비"
              />
            </View>
          </View>
        </View>
      </Container>
      <SafeAreaView>
        <View className="flex-1">
          <Button
            label="다음"
            className="absolute bottom-0 left-5 right-5 "
            float
            onPress={() =>
              navigation.navigate(MatchPostScreens.MATCH_ANNOUNCEMENT_INPUTS)
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default MatchDetailinputs;
