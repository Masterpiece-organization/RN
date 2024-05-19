import {useState, useCallback} from 'react';
import {Dimensions, View, SafeAreaView} from 'react-native';
import {
  BottomSheet,
  BottomSheetContent,
  Button,
  Container,
  TextInput,
  TitleSection,
  SelectButton,
} from '@/components';
import {useForm, FieldValues} from 'react-hook-form';
import {REFERENCE_DATA} from '@/constants';
import {
  CommonScreens,
  GuestPostScreenProps,
  GuestPostScreens,
} from '@/types/navigationTypes';
import {useBottomSheetStore} from '@/stores/store';

interface SelectedOptionType {
  [key: string]: string;
}

const {width} = Dimensions.get('window');
const buttonWidth = (width - 60) / 3;

const GuestDetailInputs = ({
  navigation,
}: GuestPostScreenProps<GuestPostScreens.GUEST_DETAIL_INPUTS>) => {
  const {open, close} = useBottomSheetStore();

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionType>({
    gender: '',
    position: '',
  });

  const {control} = useForm<FieldValues>({
    defaultValues: {
      team_size: '',
      level: '',
      match_fee: '',
    },
  });

  const handlePresentModalPress = useCallback(() => {
    open();
  }, []);

  const updateSelectedOptions = (type: string, option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [type]: prev[type] === option ? '' : option,
    }));
  };

  return (
    <>
      <BottomSheet>
        <BottomSheetContent
          type="level"
          onPress={console.log}
          onNavigateTo={() => navigation.navigate(CommonScreens.LEVEL_GUIDE)}
        />
      </BottomSheet>
      <Container>
        <View className="flex-1">
          <TitleSection
            title="찾으시는 용병의 세부 조건을 알려주세요."
            body="찾으시는 용병의 레벨, 성별, 인원 수, 그리고 경기 참가비에 대한 정보를 선택하고 입력해주세요."
          />

          <View className="relative mb-7">
            <TextInput
              control={control}
              name={'team_size'}
              placeholder={'모집 희망 인원 입력'}
              className="-z-10"
              label={'인원'}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          <View className="relative mb-7">
            <Button
              variant="custom"
              onPress={handlePresentModalPress}
              className="absolute bottom-0 z-10 w-full"
            />
            <TextInput
              control={control}
              name={'level'}
              placeholder={'경기 희망 레벨 선택'}
              className="-z-10"
              label={'레벨'}
            />
          </View>

          <SelectButton
            type="gender"
            label="성별"
            item={REFERENCE_DATA.GENDER}
            onPress={updateSelectedOptions}
            selectedOption={selectedOptions.gender}
          />
          <SelectButton
            type="position"
            label="포지션"
            item={REFERENCE_DATA.INPUT_POSITIONS_LIST}
            buttonWidth={buttonWidth}
            onPress={updateSelectedOptions}
            selectedOption={selectedOptions.position}
          />

          <View className="relative mb-7">
            <TextInput
              control={control}
              name={'match_fee'}
              placeholder={'참가비 입력'}
              label={'참가비'}
            />
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
              navigation.navigate(GuestPostScreens.GUEST_ANNOUNCEMENT_INPUTS)
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default GuestDetailInputs;
