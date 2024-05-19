/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import { Dimensions, View, SafeAreaView } from "react-native";
import {
  BottomSheet,
  BottomSheetContent,
  Button,
  Container,
  SelectButton,
  TextInput,
  TitleSection,
} from "@/components";
import { useForm, FieldValues } from "react-hook-form";
import { REFERENCE_DATA } from "@/constants";
import {
  CommonScreens,
  ClubPostScreenProps,
  ClubPostScreens,
} from "@/types/navigationTypes";
import useBottomSheet from "@/hooks/useBottomSheet";

interface SelectedOptionType {
  [key: string]: string;
}

const { width } = Dimensions.get("window");

const buttonWidth = (width - 56) / 3;

const ClubDetailInputs = ({
  navigation,
}: ClubPostScreenProps<ClubPostScreens.CLUB_DETAIL_INPUTS>) => {
  const { bottomSheetRef, open } = useBottomSheet();

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionType>({
    gender: "",
    age: "",
  });

  const { control } = useForm<FieldValues>({
    defaultValues: {
      level: "",
      match_fee: "",
    },
  });

  const handlePresentModalPress = useCallback(() => {
    open();
  }, []);

  const updateSelectedOptions = (type: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [type]: prev[type] === option ? "" : option,
    }));
  };

  return (
    <>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent
          type="level"
          onPress={console.log}
          onNavigateTo={() => navigation.navigate(CommonScreens.LEVEL_GUIDE)}
        />
      </BottomSheet>
      <Container>
        <View className="flex-1">
          <TitleSection
            title="어떤 팀원을 찾고 계신가요?"
            body="찾으시는 팀원의 레벨, 성별, 인원 수 등 원하는 조건을 설정해주세요."
          />
          <View className="relative mb-7">
            <TextInput
              control={control}
              name={"team_size"}
              placeholder={"모집 희망 인원 입력"}
              className="-z-10"
              label={"인원"}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          <SelectButton
            type="gender"
            label="성별"
            item={REFERENCE_DATA.GENDER}
            onPress={updateSelectedOptions}
            selectedOption={selectedOptions.gender}
          />
          <View className="relative mb-7">
            <Button
              variant="custom"
              onPress={handlePresentModalPress}
              className="absolute bottom-0 z-10 w-full"
            />
            <TextInput
              control={control}
              name={"level"}
              placeholder={"경기 희망 레벨 선택"}
              className="-z-10"
              label={"레벨"}
            />
          </View>
          <SelectButton
            type="age"
            label="연령대"
            item={REFERENCE_DATA.AGE}
            buttonWidth={buttonWidth}
            onPress={updateSelectedOptions}
            selectedOption={selectedOptions.age}
          />
          <View className="relative mb-7">
            <TextInput
              control={control}
              name={"match_fee"}
              placeholder={"참가비 입력"}
              label={"참가비"}
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
              navigation.navigate(ClubPostScreens.CLUB_ANNOUNCEMENT_INPUTS)
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ClubDetailInputs;
