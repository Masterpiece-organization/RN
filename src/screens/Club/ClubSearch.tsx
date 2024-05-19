import { useCallback, useEffect } from "react";
import { TouchableOpacity, View, SafeAreaView } from "react-native";
import { Avatar, Text, TextInput } from "@/components";
import { StyledLeftIcon, StyledCloseIcon } from "@/constants/icons";
import {
  useForm,
  FieldValues,
  Control,
  UseFormResetField,
} from "react-hook-form";
import { ClubScreenProps, ClubScreens } from "@/types/navigationTypes";
import {
  ClubStackParamList,
  CommonScreenParamList,
} from "@/types/navigationTypes";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type MessageTypes = "NOT_FOUND";

const MOCK_LOGS = [
  {
    image: "",
    body: "테스트",
  },
  {
    image: "",
    body: "맨체스터시티",
  },
  {
    image: "",
    body: "레알마드리드",
  },
];

const messages = {
  NOT_FOUND: "검색 결과가 없습니다.",
};

const EmptySearchResult = ({ type }: { type: MessageTypes }) => {
  return (
    <View className="mt-5 items-center justify-center">
      <Text color="color-gray-700 dark:color-gray-300">{messages[type]}</Text>
    </View>
  );
};

const ClubHeader = ({
  navigation,
  control,
  resetField,
  watchKeyword,
}: {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<ClubStackParamList, keyof ClubStackParamList>,
    NativeStackNavigationProp<
      CommonScreenParamList,
      keyof CommonScreenParamList
    >
  >;
  control: Control<FieldValues, any>;
  resetField: UseFormResetField<FieldValues>;
  watchKeyword: any;
}) => {
  return (
    <SafeAreaView>
      <View className="flex-row items-center border-b border-b-gray-50 px-[15px] pb-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <StyledLeftIcon className="color-black dark:color-white" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center justify-between">
          <TextInput
            placeholder="클럽 검색하기"
            control={control}
            name="keyword"
            className="flex-basis-auto mr-2 h-12 flex-shrink border-0 bg-transparent px-0"
            autoFocus
          />
          {watchKeyword && (
            <TouchableOpacity onPress={() => resetField("keyword")}>
              <StyledCloseIcon className="color-gray-300" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const SearchScreen = ({ filtered }) => {
  if (filtered.length === 0) return <EmptySearchResult type="NOT_FOUND" />;

  return (
    <View className="px-5 pt-5">
      {filtered.map(({ body }) => (
        <View className="flex-row items-center" key={body}>
          <Avatar type="club" size="small" className="mr-4" />
          <Text>{body}</Text>
        </View>
      ))}
    </View>
  );
};

const ClubSearch = ({
  navigation,
}: ClubScreenProps<ClubScreens.CLUB_SEARCH>) => {
  const { control, resetField, watch } = useForm<FieldValues>({
    defaultValues: {
      keyword: "",
    },
  });
  const watchKeyword = watch("keyword");

  const filtered =
    watchKeyword === ""
      ? []
      : MOCK_LOGS.filter((log) =>
          [log.body].some((text) => text.includes(watchKeyword))
        );

  return (
    <>
      <ClubHeader
        navigation={navigation}
        control={control}
        resetField={resetField}
        watchKeyword={watchKeyword}
      />
      {watchKeyword && <SearchScreen filtered={filtered} />}
    </>
  );
};

export default ClubSearch;
