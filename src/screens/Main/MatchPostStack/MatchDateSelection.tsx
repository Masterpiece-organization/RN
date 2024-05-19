import { useCallback, useState } from "react";
import { View } from "react-native";
import {
  Button,
  BottomSheet,
  BottomSheetContent,
  TextInput,
  TitleSection,
  CalendarComponent,
  WheelPicker,
} from "@/components";
import { containerStyle } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MatchPostScreens,
  MatchPostScreenProps,
} from "@/types/navigationTypes";
import { useForm, FieldValues } from "react-hook-form";
import { format, toZonedTime } from "date-fns-tz";
import { ko } from "date-fns/locale";
import showAlert from "@/utils/showAlert";
import { DateData } from "react-native-calendars";
import useBottomSheet from "@/hooks/useBottomSheet";

const formatDateToKoreanTime = (dateString) => {
  const date = new Date(dateString);
  const koreanDate = toZonedTime(date, "Asia/Seoul");
  const formattedTime = format(koreanDate, "aaaa h:mm분", { locale: ko });
  return formattedTime;
};

const MatchDateSelection = ({
  navigation,
}: MatchPostScreenProps<MatchPostScreens.MATCH_DATE_SELECTION>) => {
  const { bottomSheetRef, open, close } = useBottomSheet();

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(0);
  const [selectedEndTime, setSelectedEndTime] = useState(0);
  const [selectedType, setSelectedType] = useState("");

  const { control, handleSubmit, getValues, setValue, watch } =
    useForm<FieldValues>({
      defaultValues: {
        match_date: "",
        start_time: "",
        end_time: "",
      },
    });

  const handlePresentModalPress = useCallback(() => {
    open();
  }, []);

  const updateSelectedDate = (selectedTime) => {
    setIsPickerVisible(false);
    const extractTime = selectedTime.getHours() + selectedTime.getMinutes();
    const koreanTime = formatDateToKoreanTime(selectedTime);

    if (selectedType === "start") {
      setValue("end_time", "");
      setSelectedStartTime(selectedTime);

      return setValue("start_time", koreanTime);
    }

    const extractTimeFromStart =
      new Date(selectedStartTime).getHours() +
      new Date(selectedStartTime).getMinutes();

    if (extractTime === extractTimeFromStart) {
      setValue("end_time", "");

      return showAlert({
        title: "",
        message: "잘못된 시간 범위입니다. 다시 확인해주세요.",
        buttons: [{ text: "닫기" }],
      });
    }

    setSelectedEndTime(selectedTime);
    return setValue("end_time", koreanTime);
  };

  const handleTimePicker = (type) => {
    setSelectedType(type);
    setIsPickerVisible(true);
  };

  const handleDatePicker = useCallback((selectedDay: DateData) => {
    const month = selectedDay.month;
    const day = selectedDay.day;

    setValue("match_date", `${month}월 ${day}일`);
    close();
  }, []);

  const date = watch("match_date");
  const startTime = watch("start_time");
  const endTime = watch("end_time");

  return (
    <>
      <WheelPicker
        pickerType="time"
        // date={selectedDate}
        isVisible={isPickerVisible}
        onConfirm={updateSelectedDate}
        onCancel={() => setIsPickerVisible(false)}
      />
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent onPress={console.log}>
          <CalendarComponent onDayPress={handleDatePicker} />
        </BottomSheetContent>
      </BottomSheet>
      <View className={containerStyle("detail")}>
        <View className="flex-1">
          <TitleSection
            title="경기 일정을 정해볼까요?"
            body="원하시는 경기 일정을 설정해주세요."
          />
          <View className="relative mb-2">
            <Button
              variant="custom"
              onPress={handlePresentModalPress}
              className="absolute bottom-0 z-10 w-full"
            />
            <TextInput
              control={control}
              name="match_date"
              placeholder="경기날짜 입력"
              className="-z-10"
              label="경기일정"
            />
          </View>
          <View className="flex-row space-x-2">
            <View className="relative flex-1">
              <Button
                variant="custom"
                onPress={() => handleTimePicker("start")}
                className="absolute z-10 w-full"
              />
              <TextInput
                control={control}
                name="start_time"
                placeholder="시작시간"
                className="-z-10"
              />
            </View>
            <View className="relative flex-1">
              <Button
                variant="custom"
                onPress={() => handleTimePicker("end")}
                className="absolute z-10 w-full"
              />
              <TextInput
                control={control}
                name="end_time"
                placeholder="종료시간"
                className="-z-10"
              />
            </View>
          </View>
        </View>
        <SafeAreaView>
          <Button
            label="다음"
            onPress={() =>
              navigation.navigate(MatchPostScreens.MATCH_LOCATION_SELECTION)
            }
            disabled={!(date && startTime && endTime)}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

export default MatchDateSelection;
