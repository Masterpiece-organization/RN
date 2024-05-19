import { useRef, useState, useCallback, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Tab } from "@/components";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

export type LayoutType = {
  x: number;
  width: number;
};

export const ClubManagementTabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) => {
  // TAB ANIMATION
  const translateValue = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);
  const [toValue, setToValue] = useState(0);

  useEffect(() => {
    Animated.spring(translateValue, {
      toValue,
      damping: 5,
      mass: 1,
      stiffness: 100,
      overshootClamping: true,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
      useNativeDriver: true,
    }).start();
  }, [state, translateValue, toValue]);

  const setIndicatorBarValue = useCallback((layout: LayoutType) => {
    console.log(layout);
    setToValue(layout.x);
    setWidth(layout.width);
  }, []);

  return (
    <View className="relative mx-5 my-4 h-14 justify-center rounded-lg bg-gray-50 py-2 dark:bg-gray-950">
      <View className="mb-3 mt-4 h-full flex-row items-center justify-around px-2">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const label = options.tabBarLabel as string;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Tab
              isFocused={isFocused}
              key={route.key}
              label={label}
              onPress={onPress}
              setValue={setIndicatorBarValue}
              className="mr-0 flex-1 items-center"
              textClassName="mb-1"
            />
          );
        })}
      </View>
      <Animated.View
        className="bg-white dark:bg-gray-800"
        style={{
          ...style.mangementIndicator,
          transform: [{ translateX: translateValue }],
          width,
        }}
      />
    </View>
  );
};

const ClubTabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) => {
  // TAB ANIMATION
  const translateValue = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);
  const [toValue, setToValue] = useState(0);

  useEffect(() => {
    Animated.spring(translateValue, {
      toValue,
      damping: 5,
      mass: 1,
      stiffness: 100,
      overshootClamping: true,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
      useNativeDriver: true,
    }).start();
  }, [state, translateValue, toValue]);

  const setIndicatorBarValue = useCallback((layout: LayoutType) => {
    setToValue(layout.x + 20);
    setWidth(layout.width - 40);
  }, []);

  return (
    <View className="h-14 border-b border-b-[#ebedef] dark:border-b-[#3E4042]">
      <View className="mb-3 mt-4 flex-row items-center justify-around px-5">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const label = options.tabBarLabel as string;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const firstItem = index === 0;
          const lastItem = index === 3;

          return (
            <Tab
              isFocused={isFocused}
              key={route.key}
              label={label}
              onPress={onPress}
              setValue={setIndicatorBarValue}
              className="z-10 mr-0 flex-1 items-center"
              textClassName=""
            />
          );
        })}
      </View>
      <Animated.View
        style={{
          ...style.indicator,
          transform: [{ translateX: translateValue }],
          width,
        }}
      />
    </View>
  );
};

export default ClubTabBar;

const style = StyleSheet.create({
  indicator: {
    backgroundColor: "#3D9BFF",
    height: 2,
  },
  mangementIndicator: {
    height: "100%",
    position: "absolute",
    top: 8,
    zIndex: -1,
    borderRadius: 8,
  },
});
