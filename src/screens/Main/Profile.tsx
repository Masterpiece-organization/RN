import {
  View,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import {Text, Container, Button, Avatar, Card} from '@/components';
import {useMainContext} from '@/contexts/MainContext';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import {colorBasedOnTheme} from '@/theme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {defaultMargin} from '@/theme';

const DATA = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Third Item',
  },
  {
    id: '5',
    title: 'Third Item',
  },
  {
    id: '6',
    title: 'Third Item',
  },
  {
    id: '7',
    title: 'Third Item',
  },
  {
    id: '8',
    title: 'Third Item',
  },
];

const MOCK_MATCH_HISTORY = [
  {
    title: '맨체스터 시티',
    matches: 12,
    goals: 32,
  },
  {title: '맨체스터 유나이티드드드드드드', matches: 24, goals: 12},
];

const ScreenWidth = Dimensions.get('window').width; // 현재 화면의 너비 가져오기
const OneQuarterWidth = ScreenWidth / 6; // 현재 화면 너비의 1/4

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

interface MatchHistoryProps {
  title: string;
  matches: number;
  goals: number;
  index: number;
}

const MatchHistory = ({title, matches, goals, index}: MatchHistoryProps) => {
  const isLastItem = index === MOCK_MATCH_HISTORY.length - 1;

  return (
    <View
      className={`${
        isLastItem ? '' : 'mb-sm'
      } flex-row items-center justify-between`}>
      <View className="basis-2/3 flex-row items-center">
        <View className="mr-4 h-11 w-11 rounded-full border border-neutral-600">
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
        <Text
          className="mr-5 basis-10 text-center"
          textColor="text-gray-800 dark:text-gray-400">
          {matches}
        </Text>
        <Text
          className="basis-7 text-center"
          textColor="text-gray-800 dark:text-gray-400">
          {goals}
        </Text>
      </View>
    </View>
  );
};

const Profile = ({navigation}: ProfileScreenProps) => {
  const contexts = useMainContext();

  console.log(contexts);

  const colorScheme = contexts?.colorScheme;
  const fillColor = colorBasedOnTheme(colorScheme, 'white', '#121212');

  const handleOnPress = () => {
    console.log('onPress!');
  };

  const renderItem = ({index}: {index: number}) => {
    return (
      <View
        className={`rounded-full border border-neutral-600 ${
          index === DATA.length - 1 ? 'mr-10' : 'mr-xs'
        }`}
        style={{width: OneQuarterWidth, height: OneQuarterWidth}}>
        <Image
          source={require('@/assets/images/logo.png')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <Container scroll={true} className={`${defaultMargin} mt-base`}>
      <SafeAreaView>
        <Pressable onPress={() => navigation.navigate('EditProfile')}>
          <Card className="mb-xs mt-0 flex-row items-center justify-between  px-5 py-md">
            <View className="flex-row items-center">
              <Avatar
                className="mr-6 h-16 w-16"
                iconClassName="h-7 w-7"
                disabled={true}
              />
              <View>
                <Text className="mb-2">지네딘 지단</Text>
                <View className="flex-row gap-2">
                  <View>
                    <Text
                      type="bodySmall"
                      textColor="text-gray-800 dark:text-gray-600">
                      ST / CAM / CM
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <ArrowRightIcon color="#b0b0b0" width={16} />
          </Card>
        </Pressable>
      </SafeAreaView>
      <View>
        <Card
          className="mb-xs"
          title="경기이력"
          titleButton={
            <Button
              className="mr-1"
              label="더보기"
              onPress={console.log}
              type="text"
              textType="bodySmall"
              buttonColor=""
              textColor="text-gray-600"
              icon={
                <View className="-mr-2 ml-1.5">
                  <ArrowRightIcon
                    color="#b0b0b0"
                    width={16}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{marginBottom: 2}}
                  />
                </View>
              }
            />
          }>
          <View className="px-5 py-sm">
            <View className="mb-sm flex-row justify-between">
              <Text
                type="bodySmall"
                textColor="text-gray-800 dark:text-gray-400"
                className="basis-2/3 ">
                클럽 이름
              </Text>
              <View className="basis-1/3 flex-row justify-end">
                <Text
                  className="mr-5 basis-10 text-center"
                  type="bodySmall"
                  textColor="text-gray-800 dark:text-gray-400">
                  경기수
                </Text>
                <Text
                  type="bodySmall"
                  textColor="text-gray-800 dark:text-gray-400"
                  className="basis-7 text-center">
                  골수
                </Text>
              </View>
            </View>
            <>
              {MOCK_MATCH_HISTORY.map(({title, matches, goals}, index) => (
                <MatchHistory
                  key={index}
                  title={title}
                  matches={matches}
                  goals={goals}
                  index={index}
                />
              ))}
            </>
          </View>
        </Card>

        <Card
          className="mb-xs rounded-lg border  border-gray-600"
          title="나의 소속팀"
          titleButton={
            <Button
              className="mr-1"
              label="팀 찾기"
              onPress={console.log}
              type="text"
              textType="bodySmall"
              buttonColor=""
              textColor="text-gray-600"
              icon={
                <View className="-mr-2 ml-1.5">
                  <ArrowRightIcon
                    color="#b0b0b0"
                    width={16}
                    style={{marginBottom: 2}}
                  />
                </View>
              }
            />
          }>
          <View className="py-sm">
            <FlatList
              className="px-5"
              data={DATA}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </Card>

        <Card
          className=""
          title="나의 뱃지"
          titleButton={
            <Button
              className="mr-1"
              label="더보기"
              onPress={console.log}
              type="text"
              textType="bodySmall"
              buttonColor=""
              textColor="text-gray-600"
              icon={
                <View className="-mr-2 ml-1.5">
                  <ArrowRightIcon
                    color="#b0b0b0"
                    width={16}
                    style={{marginBottom: 2}}
                  />
                </View>
              }
            />
          }>
          <View className="py-sm">
            <FlatList
              className="px-5"
              data={DATA}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </Card>
      </View>
    </Container>
  );
};

export default Profile;
