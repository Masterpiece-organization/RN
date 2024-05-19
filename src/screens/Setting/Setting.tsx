import { View } from "react-native";
import {
  Card,
  Button,
  Text,
  Container,
  BottomSheet,
  BottomSheetContent,
} from "@/components";
import { StyledRightIcon } from "@/constants/icons";
import { SettingScreenProps, SettingScreens } from "@/types/navigationTypes";
import useBottomSheet from "@/hooks/useBottomSheet";

const createItems = ({ navigation }) => [
  {
    label: "자주 묻는 질문",
    onPress: () => {
      navigation.navigate(SettingScreens.FAQ);
    },
  },
  {
    label: "문의하기",
    onPress: () => {
      console.log("문의하기");
    },
  },
  {
    label: "이용약관",
    onPress: () => {
      console.log("이용약관");
    },
  },
  {
    label: "개인정보 처리방침",
    onPress: () =>
      navigation.navigate(SettingScreens.SETTING_DETAIL, { type: "terms" }),
  },
  {
    label: "테마",
    onPress: () => {
      navigation.navigate(SettingScreens.SETTING_DETAIL, { type: "theme" });
    },
  },
  {
    label: "버전정보",
    icon: null,
    onPress: () => {
      console.log("버전정보");
    },
  },
];

const Setting = ({
  navigation,
}: SettingScreenProps<SettingScreens.SETTING>) => {
  const { bottomSheetRef, open } = useBottomSheet();

  const items = createItems({ navigation });

  return (
    <>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent>
          <Text type="display" className="mb-5 px-5 text-xl">
            로그아웃
          </Text>
          <Text
            className="mx-5 mb-11 text-lg"
            color="text-gray-700 dark:text-white"
          >
            언제든지 다시 로그인하실 수 있습니다.
          </Text>
          <View>
            <Button label="로그아웃 하기" float className="mx-5" />
          </View>
        </BottomSheetContent>
      </BottomSheet>
      <Container className="bg-gray-50 dark:bg-black" type="card">
        <Card size="medium" className="mb-3">
          <View className="mb-4 flex-row justify-between">
            <Text type="title">알림설정</Text>
          </View>
          <Button
            onPress={() => {
              navigation.navigate(SettingScreens.SETTING_DETAIL, {
                type: "notification",
              });
            }}
            type="text"
            variant="custom"
            className="flex-row items-center justify-between"
          >
            <Text>푸시알림 설정</Text>
            <StyledRightIcon
              width={16}
              height={16}
              className="color-gray-200"
            />
          </Button>
        </Card>
        <Card size="medium" className="mb-3">
          <View className="mb-4 flex-row justify-between">
            <Text type="title">기타</Text>
          </View>
          {items.map(({ label, onPress }, i) => {
            const lastIndex = items.length - 1;

            return (
              <Button
                type="text"
                variant="custom"
                onPress={onPress}
                className={`${lastIndex === i ? "" : "mb-4"}`}
                key={i}
              >
                <View className="flex-row items-center justify-between">
                  <Text>{label}</Text>
                  {label !== "버전정보" ? (
                    <StyledRightIcon
                      width={16}
                      height={16}
                      className="color-gray-200"
                    />
                  ) : (
                    <Text color="text-gray-900">0.1.0</Text>
                  )}
                </View>
              </Button>
            );
          })}
        </Card>
        <Card>
          <Button type="text" variant="custom" onPress={() => open()}>
            <Text>로그아웃</Text>
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default Setting;
