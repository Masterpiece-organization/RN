import { View } from "react-native";
import { Text } from "@/components";
const ClubLineup = () => {
  return (
    <View>
      <View className="bg-white p-5 dark:bg-gray-950">
        <Text type="title" className="mb-3">
          클럽 소개
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
    </View>
  );
};

export default ClubLineup;
