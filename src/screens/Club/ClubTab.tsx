import {
  Animated,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { Avatar, Text } from "@/components";
import { StyledLeftIcon } from "@/constants/icons";
import { useScrollStore } from "@/stores/store";
import { ClubDetailTabScreen } from "@/navigation";

const headerHeight = 198;
const minScroll = 100;
const activeRange = 298;

const { height } = Dimensions.get("window");

const Header = ({}) => {
  return (
    <View className="bg-gray-50 dark:bg-black">
      <View className="mb-9 mt-4 items-center justify-center">
        <Avatar type="club" size="large" />
      </View>
    </View>
  );
};

const ClubTab = ({ navigation }) => {
  const { scrollY } = useScrollStore();

  const diffClampScrollY = Animated.diffClamp(
    scrollY,
    -minScroll,
    activeRange + minScroll
  );
  const translateY = diffClampScrollY.interpolate({
    inputRange: [0, activeRange],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        height: height + 298,
      }}
    >
      <Animated.View
        className="flex-1"
        style={{ transform: [{ translateY: translateY }] }}
      >
        <Header />
        <ClubDetailTabScreen />
      </Animated.View>
    </View>
  );
};

export default ClubTab;
