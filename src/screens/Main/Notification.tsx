import {View} from 'react-native';
import {Button, Text} from '@/components';
import {formatTime} from '@/utils/formatDate';
import {FlashList} from '@shopify/flash-list';

interface Item {
  type: MessageTemplateType;
  from: string;
  to: string;
}
type MessageTemplateType = 'match' | 'guest' | 'clubPosting' | 'memberPosting';

const MOCK_DATA: Item[] = [
  {
    type: 'match',
    from: '바이에른뮌핸',
    to: '레알마드리드',
  },
  {
    type: 'guest',
    from: '김민재',
    to: '바이에른뮌핸',
  },
  {
    type: 'clubPosting',
    from: '홀란드',
    to: '맨체스터시티',
  },
  {
    type: 'memberPosting',
    from: '입단테스트',
    to: '테스트',
  },
];

const messageTemplates = {
  match: ({from, to}: {from: string; to: string}) => (
    <Text>
      <Text weight="bold">{from}</Text> 팀에서 <Text weight="bold">{to}</Text>{' '}
      팀에 경기 요청 메시지를 보냈습니다.
    </Text>
  ),
  guest: ({from, to}: {from: string; to: string}) => (
    <Text>
      <Text weight="bold">{from}</Text>님이 <Text weight="bold">{to}</Text> 팀에
      용병 신청 메시지를 보냈습니다.
    </Text>
  ),
  clubPosting: ({from, to}: {from: string; to: string}) => (
    <Text>
      <Text weight="bold">{from}</Text>님이 <Text weight="bold">{to}</Text> 팀에
      입단을 요청했습니다.
    </Text>
  ),
  memberPosting: ({from, to}: {from: string; to: string}) => (
    <Text>
      <Text weight="bold">{from}</Text>님이 <Text weight="bold">{to}</Text>{' '}
      팀에서 입단 제의가 왔습니다.
    </Text>
  ),
};

const renderItem = ({item}: {item: Item}) => {
  const messageTemplate = messageTemplates[item.type];

  return (
    <View className="bg-gray-50 px-5 py-4 dark:bg-gray-950">
      <View className="mb-1 flex-row justify-between">
        <Text type="caption" className="color-gray-300">
          {item.type}
        </Text>
        <Text type="caption" className="color-gray-300">
          {formatTime(new Date())}
        </Text>
      </View>
      <View className="flex-row flex-wrap">
        {messageTemplate({from: item.from, to: item.to})}
      </View>
      {(item.type === 'clubPosting' || item.type === 'memberPosting') && (
        <View className="mt-4 flex-row">
          <Button
            label="거절하기"
            type="text"
            variant="custom"
            className="mr-2 h-9 items-center justify-center rounded-lg bg-gray-100 px-3 py-0 dark:bg-gray-300"
            labelColor="color-black dark:color-gray-900"
          />
          <Button
            label="수락하기"
            type="text"
            variant="custom"
            className="h-9 items-center justify-center rounded-lg bg-primary px-3 py-0"
            labelColor="color-white"
          />
        </View>
      )}
    </View>
  );
};

const Notification = () => {
  return (
    <View className="flex-1">
      <FlashList
        data={MOCK_DATA}
        renderItem={renderItem}
        estimatedItemSize={50}
        keyExtractor={(item, index) => `${item.type}-${index}`}
      />
    </View>
  );
};

export default Notification;
