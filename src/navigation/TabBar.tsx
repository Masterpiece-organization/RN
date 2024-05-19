/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  BottomSheet,
  Text,
  Tab,
  BottomSheetContent,
  CalendarComponent,
} from '@/components';
import {StyledArrowBottomIcon} from '@/constants/icons';
import {TOP_TAB_DATA} from '@/constants';
import {ContentTypes} from '@/constants/bottomSheetData';
import {CommonScreens} from '@/types/navigationTypes';
import useBottomSheet from '@/hooks/useBottomSheet';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

export type LayoutType = {
  x: number;
  width: number;
};

const FilterItem = ({
  tabName,
  handleBottomSheet,
}: {
  tabName: string;
  handleBottomSheet: (type: ContentTypes) => void;
}) => {
  const filterMenus = TOP_TAB_DATA.TAB_FILTER_MENUS.find(
    menu => menu.type === tabName,
  )?.menues;

  return (
    <View className="mt-4 pb-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-x-2 px-[15px]">
          {filterMenus?.map(({title, type}) => {
            return (
              <TouchableOpacity
                key={type}
                className="flex-row items-center justify-center rounded-full border border-gray-100 px-3 py-1 dark:border-gray-700"
                onPress={() => handleBottomSheet(type)}>
                <Text color="text-gray-700 dark:text-gray-300 mr-1">
                  {title}
                </Text>
                <StyledArrowBottomIcon
                  className="color-gray-700 dark:text-gray-300"
                  width={12}
                  height={12}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const TabBar = ({state, descriptors, navigation}: MaterialTopTabBarProps) => {
  const {bottomSheetRef, open} = useBottomSheet();
  const [bottomSheetType, setBottomSheetType] = useState<
    ContentTypes | 'date' | undefined
  >(undefined);

  const handleBottomSheet = useCallback((type: ContentTypes | 'date') => {
    setBottomSheetType(type);
    open();
  }, []);

  const screenName =
    navigation.getState().routes[navigation.getState().index].name;

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
    setToValue(layout.x);
    setWidth(layout.width);
  }, []);

  return (
    <>
      <BottomSheet ref={bottomSheetRef}>
        {bottomSheetType === 'date' ? (
          <BottomSheetContent onPress={console.log}>
            <CalendarComponent onDayPress={console.log} />
          </BottomSheetContent>
        ) : (
          <BottomSheetContent
            type={bottomSheetType}
            onPress={console.log}
            onNavigateTo={() => navigation.navigate(CommonScreens.LEVEL_GUIDE)}
          />
        )}
      </BottomSheet>

      <View className="border-b border-b-[#ebedef] dark:border-b-[#3E4042]">
        <View className="mt-4 flex-row items-center pl-[15px]">
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const {options} = descriptors[route.key];

            const label = options.tabBarLabel as string;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
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
              />
            );
          })}
        </View>
        <Animated.View
          style={{
            ...style.indicator,
            transform: [{translateX: translateValue}],
            width,
          }}
        />
        <FilterItem
          tabName={screenName}
          handleBottomSheet={handleBottomSheet}
        />
      </View>
    </>
  );
};

export default TabBar;

const style = StyleSheet.create({
  indicator: {
    backgroundColor: '#3D9BFF',
    height: 2,
  },
});
