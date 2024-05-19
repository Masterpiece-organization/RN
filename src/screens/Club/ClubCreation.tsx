import { useState, useCallback } from "react";
import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import {
  Avatar,
  BottomSheet,
  BottomSheetContent,
  Button,
  CalendarComponent,
  Container,
  ImagePickerModal,
  SelectButton,
  TextInput,
  Text,
} from "@/components";
// import ColorPalette from "react-native-color-palette";
import { StyledImageIcon } from "@/constants/icons";
import { useForm, FieldValues } from "react-hook-form";
import useCamera from "@/hooks/useCamera";
import useBottomSheet from "@/hooks/useBottomSheet";
import { REFERENCE_DATA } from "@/constants";
import { DateData } from "react-native-calendars";
import { ContentTypes } from "@/constants/bottomSheetData";
import {
  CommonScreens,
  ClubScreenProps,
  ClubScreens,
} from "@/types/navigationTypes";

interface SelectedOptionType {
  [key: string]: string;
}

const { width } = Dimensions.get("window");

const buttonWidth = (width - 56) / 3;
const colorWidth = (width - 94) / 4;

const COLORS = [
  "#dc2626",
  "#ea580c",
  "#facc15",
  "#16a34a",
  "#2563eb",
  "#3730a3",
  "#9333ea",
  "#030712",
];

const ColorPalette = () => {
  return (
    <View className="flex-row flex-wrap gap-2 px-5 pb-5">
      {COLORS.map((color) => {
        return (
          <TouchableOpacity key={color}>
            {/* bg-[${color}] */}
            <View
              className="rounded-full"
              style={{
                backgroundColor: color,
                width: colorWidth,
                height: colorWidth,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ClubCreation = ({
  navigation,
}: ClubScreenProps<ClubScreens.CLUB_CREATION>) => {
  const { bottomSheetRef, open, close } = useBottomSheet();

  const [bottomSheetType, setBottomSheetType] = useState<
    ContentTypes | "date" | "color" | undefined
  >(undefined);
  const [isImagePickerVisible, setisImagePickerVisible] = useState(false);
  const {
    imageResponse,
    setImageResponse,
    onImageGalleryClick,
    onCameraPress,
  } = useCamera({
    onClose: () => setisImagePickerVisible(false),
  });
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionType>({
    gender: "",
    age_group: "",
  });
  const [selectedColor, setSelectedColor] = useState("#C0392B");

  const { control, handleSubmit, getValues, setValue } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      foundation_date: "",
      location: "",
      level: "",
      monthly_fee: "",
      uniform_color: "",
    },
  });

  const handleDatePicker = useCallback((selectedDay: DateData) => {
    const year = selectedDay.year;
    const month = selectedDay.month;
    const day = selectedDay.day;

    setValue("foundation_date", `${year}년 ${month}월 ${day}일`);
    close();
  }, []);

  const handleBottomSheet = useCallback((type: ContentTypes | "date") => {
    setBottomSheetType(type);
    open();
  }, []);

  const updateSelectedOptions = (type: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [type]: prev[type] === option ? "" : option,
    }));
  };

  const rednerBottomContent = useCallback(() => {
    if (bottomSheetType === "date")
      return (
        <BottomSheetContent onPress={console.log}>
          <CalendarComponent onDayPress={handleDatePicker} />
        </BottomSheetContent>
      );

    if (bottomSheetType === "color")
      return (
        <BottomSheetContent onPress={console.log}>
          <Text type="display" className="mb-5 px-5 text-xl">
            유니폼 컬러
          </Text>

          <ColorPalette />
        </BottomSheetContent>
      );

    return (
      <BottomSheetContent
        type={bottomSheetType}
        onPress={console.log}
        onNavigateTo={() => {
          close();
          navigation.navigate(CommonScreens.LEVEL_GUIDE);
        }}
      />
    );
  }, [bottomSheetType]);

  return (
    <>
      <ImagePickerModal
        visible={isImagePickerVisible}
        isUploaded={imageResponse}
        setImageResponse={setImageResponse}
        onClose={() => setisImagePickerVisible(false)}
        onImageLibraryPress={onImageGalleryClick}
        onCameraPress={onCameraPress}
      />
      <BottomSheet ref={bottomSheetRef}>
        {/* {bottomSheetType === "date" ? (
          <BottomSheetContent onPress={console.log}>
            <CalendarComponent onDayPress={handleDatePicker} />
          </BottomSheetContent>
        ) : (
          <BottomSheetContent
            type={bottomSheetType}
            onPress={console.log}
            onNavigateTo={() => {
              close();
              navigation.navigate(CommonScreens.LEVEL_GUIDE);
            }}
          />
        )} */}
        {rednerBottomContent()}
      </BottomSheet>
      <Container>
        <View>
          <View className="mb-9 items-center pt-4">
            <Avatar
              type="club"
              size="large"
              source={imageResponse?.assets?.[0]?.uri ?? undefined}
              isIcon
              onPress={() => setisImagePickerVisible(true)}
            />
          </View>
          <View className="mb-7">
            <TextInput
              control={control}
              name="name"
              placeholder="클럽명 입력"
              label="클럽명"
            />
          </View>
          <View className="relative mb-7">
            <Button
              variant="custom"
              onPress={() => handleBottomSheet("date")}
              className="absolute bottom-0 z-10 w-full"
            />
            <TextInput
              control={control}
              name="foundation_date"
              placeholder="클럽 창단일 입력"
              label="클럽 창단일"
            />
          </View>

          <View className="relative mb-7">
            <Button
              variant="custom"
              onPress={() => handleBottomSheet("location")}
              className="absolute bottom-0 z-10 w-full"
            />
            <TextInput
              control={control}
              name="location"
              placeholder="활동지역 입력"
              label="활동지역"
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
            type="age_group"
            label="연령대"
            item={REFERENCE_DATA.AGE}
            onPress={updateSelectedOptions}
            selectedOption={selectedOptions.age_group}
            buttonWidth={buttonWidth}
          />
          <View className="relative mb-7">
            <Button
              variant="custom"
              onPress={() => handleBottomSheet("level")}
              className="absolute bottom-0 z-10 w-full"
            />
            <TextInput
              control={control}
              name="level"
              placeholder="레벨 입력"
              label="클럽 레벨"
            />
          </View>
          <View className="mb-7">
            <TextInput
              control={control}
              name="monthly_fee"
              placeholder="회비 입력"
              label="클럽 회비"
              keyboardType="number-pad"
            />
          </View>
          <View className="relative mb-7">
            <Button
              variant="custom"
              onPress={() => handleBottomSheet("color")}
              className="absolute bottom-0 z-10 w-full"
            />
            <TextInput
              control={control}
              name="uniform_color"
              placeholder="클럽 유니폼 컬러 설정"
              label="유니폼 컬러"
            />
          </View>
          <View className="relative mb-7">
            <Text color="text-gray-700 dark:text-gray-300" className="mb-2">
              클럽 사진
            </Text>
            <Button
              variant="custom"
              onPress={() => handleBottomSheet("level")}
              className="absolute bottom-0 z-10 w-full"
            />
            <View className="aspect-video items-center justify-center rounded-lg border border-gray-50 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
              <StyledImageIcon className="color-gray-50 dark:color-gray-500 mb-3" />
              <Text color="color-gray-200">클럽사진 업로드하기</Text>
            </View>
            {/* <Image
              source={{ uri: "" }}
              // source={require('@/assets/images/logo.png')}
              className="h-full w-full rounded-full border border-gray-50 dark:border-gray-800"
              resizeMode="cover"
            /> */}
          </View>
        </View>
      </Container>
    </>
  );
};

export default ClubCreation;
