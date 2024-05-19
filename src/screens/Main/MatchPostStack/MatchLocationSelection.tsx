import {useState} from 'react';
import {View} from 'react-native';
import {TitleSection, Button, TextInput} from '@/components';
import {containerStyle} from '@/theme';
import {useForm, FieldValues} from 'react-hook-form';
import {MatchPostScreens, MatchPostScreenProps} from '@/types/navigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';

const MatchLocationSelection = ({
  navigation,
}: MatchPostScreenProps<MatchPostScreens.MATCH_LOCATION_SELECTION>) => {
  const {control, handleSubmit, watch, setValue} = useForm<FieldValues>({
    defaultValues: {
      location: '',
    },
  });

  const location = watch('');

  return (
    <View className={containerStyle('detail')}>
      <View className="flex-1">
        <TitleSection
          title="어디서 경기를 치루실 건가요?"
          body="원하시는 장소를 선택해주세요."
        />
        <View className="relative mb-7">
          <Button
            variant="custom"
            onPress={() =>
              navigation.navigate(MatchPostScreens.LOCATION_SEARCH_STACK)
            }
            className="absolute bottom-0 z-10 w-full"
          />
          <TextInput
            control={control}
            name="location"
            placeholder="주소 입력"
            className="-z-10"
            label="주소"
          />
        </View>
      </View>

      <SafeAreaView>
        <Button
          label="다음"
          onPress={() =>
            navigation.navigate(MatchPostScreens.MATCH_DETAIL_INPUTS, {
              type: 'public',
            })
          }
          // disabled={!location}
        />
      </SafeAreaView>
    </View>
  );
};

export default MatchLocationSelection;
