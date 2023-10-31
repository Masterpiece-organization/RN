import {View, Image} from 'react-native';
import {Text, Container, Card} from '@/components';
import {defaultMargin} from '@/theme';

const MOCK_MATCH_HISTORY = [
  {
    title: '맨체스터 시티',
    matches: 12,
    goals: 32,
  },
  {title: '맨체스터 유나이티드드드드드드', matches: 24, goals: 12},
  {
    title: '울버햄튼',
    matches: 2,
    goals: 2,
  },
  {title: '첼시', matches: 4, goals: 12},
];
interface MatchHistoryProps {
  title: string;
  matches: number;
  goals: number;
  index: number;
}

const MatchHistoryComponent = ({
  title,
  matches,
  goals,
  index,
}: MatchHistoryProps) => {
  const isLastItem = index === MOCK_MATCH_HISTORY.length - 1;

  return (
    <View
      className={`${
        isLastItem ? '' : 'mb-sm'
      } flex-row items-center justify-between`}>
      <View className="basis-2/3 flex-row items-center">
        <View className="mr-4 h-[52px] w-[52px] rounded-full border border-neutral-600">
          <Image
            source={require('@/assets/images/logo.png')}
            className="h-full w-full"
            resizeMode="cover"
          />
        </View>
        <Text className="w-2/3" numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View className="basis-1/3 flex-row justify-end">
        <Text className="mr-5 basis-10 text-center" textColortype="dark">
          {matches}
        </Text>
        <Text className="basis-7 text-center" textColortype="dark">
          {goals}
        </Text>
      </View>
    </View>
  );
};

const MatchHistory = () => {
  return (
    <Container scroll={true} className={`${defaultMargin} mt-base`}>
      <Card
        className="mb-xs"
        title="경기이력"
        titleButton={
          <View className="basis-1/3 flex-row justify-end">
            <Text className="mr-5 basis-10 text-center" type="bodySmall">
              경기수
            </Text>
            <Text className="basis-7 text-center" type="bodySmall">
              골수
            </Text>
          </View>
        }>
        <View className="px-5 py-sm">
          {MOCK_MATCH_HISTORY.map(({title, matches, goals}, index) => (
            <MatchHistoryComponent
              key={index}
              title={title}
              matches={matches}
              goals={goals}
              index={index}
            />
          ))}
        </View>
      </Card>
    </Container>
  );
};

export default MatchHistory;
