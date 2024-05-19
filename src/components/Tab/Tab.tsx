import { useState, useEffect } from "react";
import { LayoutChangeEvent, TouchableOpacity } from "react-native";
import { Text } from "@/components";
import { LayoutType } from "@/navigation/TabBar";

interface TabProps {
  isFocused: boolean;
  label: string;
  onPress: () => void;
  setValue: (layout: LayoutType) => void;
  className?: string;
  textClassName?: string;
}

const Tab = ({
  isFocused,
  label,
  onPress,
  setValue,
  className,
  textClassName,
}: TabProps) => {
  const [layout, setLayout] = useState<any>(null);

  useEffect(() => {
    if (isFocused && layout) {
      setValue(layout);
    }
  }, [isFocused, layout, setValue]);

  const onLayout = (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setLayout({ x, width });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLayout={onLayout}
      className={className ?? "mr-4"}
    >
      <Text
        type="header"
        color={`${
          isFocused
            ? "color-black dark:color-white"
            : "color-gray-200 dark:color-gray-700"
        }`}
        className={textClassName ?? "text-xl"}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tab;
