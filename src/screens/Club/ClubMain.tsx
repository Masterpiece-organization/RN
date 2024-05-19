import { View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import {
  BottomSheet,
  BottomSheetContent,
  Button,
  Text,
  Avatar,
  Card,
} from "@/components";
import { StyledSearchIcon, StyledMenuIcon } from "@/constants/icons";
import { ClubScreenProps, ClubScreens } from "@/types/navigationTypes";
import useBottomSheet from "@/hooks/useBottomSheet";

const Header = ({ navigation, onPress }) => {
  return (
    <SafeAreaView className="flex-row justify-between bg-white dark:bg-black">
      <View className="justify-center">
        <Text type="display" className="ml-[15px]">
          클럽
        </Text>
      </View>

      <TouchableOpacity
        className="mr-[18px] h-12 w-12 items-end justify-center"
        onPress={onPress}
      >
        <StyledMenuIcon className="color-gray-100 dark:color-gray-100" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const ClubMain = ({ navigation }: ClubScreenProps<ClubScreens.CLUB_MAIN>) => {
  const { bottomSheetRef, open, close } = useBottomSheet();

  return (
    <>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent>
          <Text type="display" className="mb-5 px-5 text-xl">
            클럽 메뉴
          </Text>
          <View className="px-5">
            <TouchableOpacity className="mb-4 flex-row items-center">
              <Text
                weight="medium"
                className="text-lg"
                color="text-gray-700 dark:text-white"
              >
                전체 클럽보기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-4 flex-row items-center"
              onPress={() => {
                close();
                navigation.navigate(ClubScreens.CLUB_CREATION);
              }}
            >
              <Text
                weight="medium"
                className="text-lg"
                color="text-gray-700 dark:text-white"
              >
                클럽 만들기
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetContent>
      </BottomSheet>
      <View className="flex-1 bg-gray-50 pb-14 dark:bg-black">
        <Header navigation={navigation} onPress={open} />

        <View className="bg-white p-5 dark:bg-gray-950">
          <Text className="mb-3" color="text-gray-700 dark:color-gray-300">
            찾는 클럽이 있으신가요?
          </Text>
          <Button
            onPress={() => navigation.navigate(ClubScreens.CLUB_SEARCH)}
            type="text"
            variant="custom"
            className="h-[54px] flex-row items-center rounded-lg bg-gray-50 px-4 active:scale-[.99] dark:bg-gray-900"
          >
            <StyledSearchIcon className="color-gray-50 dark:color-gray-700 mr-2" />
            <Text color="color-gray-200">클럽 검색하기</Text>
          </Button>
        </View>
        <View className="mt-3 bg-white py-5 dark:bg-gray-950">
          <Text type="title" className="mb-8 px-5">
            내가 가입한 클럽
          </Text>

          <ScrollView
            horizontal
            contentContainerStyle={{ flex: 1, paddingHorizontal: 20 }}
          >
            <Button
              onPress={() => navigation.navigate(ClubScreens.CLUB_DETAIL_TAB)}
              type="text"
              variant="custom"
              className="items-center justify-center"
            >
              <Avatar type="club" size="large" />
              <Text
                weight="semibold"
                className="mt-4 w-[100px] text-center"
                color="color-gray-700 dark:color-gray-300"
                numberOfLines={1}
              >
                맨체스터시티
              </Text>
            </Button>
            {/* 클럽없을시 */}
            {/* <View className="flex-1 items-center justify-center">
              <Text type="header">아직 가입한 클럽이 없으시네요.</Text>
              <Text>새로운 클럽을 만들어 보는건 어떨까요?</Text>

              <Button
                label="클럽 만들기"
                className="mt-6 w-full"
                onPress={() => navigation.navigate(ClubScreens.CLUB_CREATION)}
              />
            </View> */}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default ClubMain;
