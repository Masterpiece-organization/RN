import {View} from 'react-native';
import {Button, TextInput, TitleSection} from '@/components';
import {containerStyle} from '@/theme';
import {useForm, FieldValues} from 'react-hook-form';
import {
  CommonScreens,
  GuestPostScreens,
  GuestPostScreenProps,
} from '@/types/navigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';

const GuestMatchSelection = ({
  navigation,
}: GuestPostScreenProps<GuestPostScreens.GUEST_MATCH_SELECTION>) => {
  const {control} = useForm<FieldValues>({
    defaultValues: {
      match: '',
    },
  });

  return (
    <>
      <View className={containerStyle('detail')}>
        <View className="flex-1">
          <TitleSection
            title="어떤 경기에 용병이 필요 하시나요?"
            body="용병이 필요하신 경기를 선택해주세요."
          />

          <View className="relative mb-2">
            <Button
              variant="custom"
              onPress={() =>
                navigation.navigate(CommonScreens.MATCH_SCHEDULE, {
                  type: 'guest',
                })
              }
              className="absolute bottom-0 z-10 w-full"
            />
            <TextInput
              control={control}
              name="match"
              placeholder="경기 선택"
              className="-z-10"
              label="경기 일정"
            />
          </View>
        </View>
        <SafeAreaView>
          <Button
            label="다음"
            onPress={() => {
              navigation.navigate(GuestPostScreens.GUEST_DETAIL_INPUTS);
            }}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

export default GuestMatchSelection;
