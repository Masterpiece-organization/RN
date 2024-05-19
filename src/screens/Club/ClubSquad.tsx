import { useState, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { Avatar, Button, Text } from "@/components";
import { useScrollStore } from "@/stores/store";
import { AnimatedFlashList } from "@shopify/flash-list";

const MOCK_DATA = [
  {
    type: "header",
    body1: "이름",
    body2: "포지션",
  },
  {
    type: "captain",
    position: "ST",
    user: "테스트",
  },
  {
    type: "user",
    position: "CF",
    user: "테스트",
  },
  {
    type: "user",
    position: "CAM",
    user: "테스트",
  },
  {
    type: "user",
    position: "CM",
    user: "테스트",
  },
  {
    type: "user",
    position: "CB",
    user: "테스트",
  },
  {
    type: "user",
    position: "RB",
    user: "테스트",
  },
  {
    type: "user",
    position: "GK",
    user: "테스트",
  },
];

const stickyHeaderIndices = MOCK_DATA.map((item, index) => {
  if (item.type === "header") {
    return index;
  } else {
    return null;
  }
}).filter((item) => item !== null) as number[];

const renderItem = ({ item }, navigation) => {
  return (
    <Button
      type="text"
      variant="custom"
      // className={`${index === 0 && "mt-4"} mb-2`}
      className="mb-2"
    >
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Avatar className="mr-4" size="small" />
          <Text color="text-gray-900 dark:text-white">{item.user}</Text>
        </View>
        <View className="">
          <Text color="text-gray-300 dark:text-gray-600">{item.position}</Text>
        </View>
      </View>
    </Button>
  );
};

const ClubSquad = ({ navigation }) => {
  const { scrollY } = useScrollStore();

  const AnimatedScrollY = useRef(scrollY).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: AnimatedScrollY } } }],
    {
      useNativeDriver: true,
    }
  );

  return (
    <View className="flex-1 bg-white dark:bg-gray-950">
      {/* <Animated.ScrollView
      className="flex-1 bg-gray-50 dark:bg-black"
      onScroll={onScroll}
      contentContainerStyle={{
        paddingBottom: 380,
      }}
    >
      <View className="bg-white p-5 dark:bg-gray-950">
        <Text type="title" className="mb-3">
          선수 명단
        </Text>
        <View>
          <Text>
            안녕하세요, 저희는 서울에서 활동중인 FC서울 입니다. 실력과 상관없이
            열심히 경기에 참여하는 분들 위주로 클럽이 구성되었습니다. 다치지
            않고 편하게 같이 축구 하실분들 언제나 환영합니다! 안녕하세요, 저희는
            서울에서 활동중인 FC서울 입니다. 실력과 상관없이 열심히 경기에
            참여하는 분들 위주로 클럽이 구성되었습니다.
          </Text>
        </View>
      </View>
    </Animated.ScrollView> */}

      <AnimatedFlashList
        data={MOCK_DATA}
        // renderItem={(props) => renderItem(props, navigation)}
        renderItem={({ item }) => {
          if (item.type === "header") {
            // Rendering header
            return (
              <View className="mb-4 flex-row justify-between border-b border-b-gray-50 bg-white pb-4 dark:border-b-gray-800 dark:bg-gray-950">
                <Text type="caption" color="color-gray-300 dark:color-gray-600">
                  {item.body1}
                </Text>
                <Text type="caption" color="color-gray-300 dark:color-gray-600">
                  {item.body2}
                </Text>
              </View>
            );
          } else {
            // Render item
            return renderItem({ item }, navigation);
          }
        }}
        stickyHeaderIndices={stickyHeaderIndices}
        estimatedItemSize={60}
        keyExtractor={(item, index) => item.type + index}
        onScroll={onScroll}
        // stickyHeaderHiddenOnScroll

        // StickyHeaderComponent={() => (
        //   <View className="-mx-5">
        //     <View className="mb-4 flex-row justify-between border-b  border-b-gray-50 pb-4 pl-[76px] pr-5">
        //       <Text type="caption" color="color-gray-300 dark:color-gray-600">
        //         이름
        //       </Text>
        //       <Text type="caption" color="color-gray-300 dark:color-gray-600">
        //         포지션
        //       </Text>
        //     </View>
        //   </View>
        // )}
        // ListHeaderComponent={() => (
        //   <View className="-mx-5">
        //     {/* <Text type="title" className="mb-3 ml-5">
        //       선수 명단
        //     </Text> */}
        //     <View className="mb-4 flex-row justify-between border-b  border-b-gray-50 pb-4 pl-[76px] pr-5">
        //       <Text type="caption" color="color-gray-300 dark:color-gray-600">
        //         이름
        //       </Text>
        //       <Text type="caption" color="color-gray-300 dark:color-gray-600">
        //         포지션
        //       </Text>
        //     </View>
        //   </View>
        // )}
        contentContainerStyle={{
          paddingBottom: 420,
          paddingHorizontal: 20,
        }}
      />
    </View>
  );
};

export default ClubSquad;
