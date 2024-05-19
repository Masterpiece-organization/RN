import {View} from 'react-native';
import {Text} from '@/components';

export interface InfoCardProps {
  label: string;
  content?: string;
  icon: React.ReactNode;
}

const InfoCard = ({label, content, icon}: InfoCardProps) => {
  return (
    <View className="relative h-24 flex-1 basis-24 rounded-lg bg-gray-50 p-3 dark:bg-black">
      <View>
        <Text type="caption" color="text-gray-700 dark:text-gray-300">
          {label}
        </Text>
        <View className="flex-row items-center">
          <Text weight="semibold">{content}</Text>
          {label === '회비' && <Text type="caption">원</Text>}
          {label === '나이' && <Text type="caption">살</Text>}
          {label === '연령대' && <Text type="caption">대</Text>}
          {label === '모집 인원' && <Text type="caption">명</Text>}
        </View>
      </View>
      <View className="absolute bottom-2.5 right-2.5 items-end">{icon}</View>
    </View>
  );
};

export default InfoCard;
