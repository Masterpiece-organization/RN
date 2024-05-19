/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useMemo, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Button, CalendarStrip, CheckBox, Text} from '@/components';
import {containerStyle} from '@/theme';
import moment from 'moment';
import {
  GuestPostScreenProps,
  CommonScreens,
  GuestPostScreens,
} from '@/types/navigationTypes';

const MOCK_DATA = [
  {
    date: '2024-04-29',
    location: '서울 서초구 방배동 1000-1234',
    startTime: '14:00',
    endTime: '17:00',
  },
  {
    date: '2024-05-01',
    location: '서울 서초구 방배동 1000-1234',
    startTime: '14:00',
    endTime: '17:00',
  },
];

const MatchSchedule = ({
  navigation,
}: GuestPostScreenProps<CommonScreens.MATCH_SCHEDULE>) => {
  const [matches, setMatches] = useState<
    {date: string; location: string; startTime: string; endTime: string}[]
  >([]);

  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateSelected = date => {
    const found = MOCK_DATA.find(
      d => d.date === moment(date).format('YYYY-MM-DD'),
    );
    setMatches(found ? [found] : []);
    setSelectedDate(date);
  };

  const markedDates = useMemo(
    () =>
      MOCK_DATA.reduce<Record<string, {marked: boolean}>>((acc, current) => {
        const formattedDate = moment(current.date).format('YYYY-MM-DD');
        acc[formattedDate] = {marked: true};

        return acc;
      }, {}),
    [MOCK_DATA],
  );

  const stripMarkedDates = useMemo(
    () =>
      MOCK_DATA.map(item => ({
        date: item.date,
        dots: [{color: '#3D9BFF'}],
      })),
    [MOCK_DATA],
  );

  useEffect(() => {
    handleDateSelected(moment().format('YYYY-MM-DD'));
  }, []);

  return (
    <>
      <View className="h-28 border-b border-b-gray-50 dark:border-b-gray-900 ">
        <CalendarStrip
          selectedDate={selectedDate}
          stripMarkedDates={stripMarkedDates}
          markedDates={markedDates}
          onDateSelected={handleDateSelected}
        />
      </View>
      <View className={`${containerStyle('detail')} pt-0`}>
        {matches.length !== 0 ? (
          <FlatList
            data={matches}
            renderItem={({item: {location, startTime, endTime}}) => (
              <Button
                type="outlined"
                variant="split"
                onPress={() =>
                  navigation.navigate(GuestPostScreens.GUEST_MATCH_SELECTION)
                }
                className="mt-4">
                <View>
                  <Text weight="bold" className="mb-1">
                    {location}
                  </Text>
                  <Text type="caption" weight="medium" color="text-gray-700">
                    {`${startTime} - ${endTime}`}
                  </Text>
                </View>

                <CheckBox />
              </Button>
            )}
            keyExtractor={({startTime}) => startTime}
          />
        ) : (
          <View className="mt-6 items-center">
            <Text color="text-gray-700 dark:text-gray-300" weight="semibold">
              해당되는 경기 내역이 없습니다.
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default MatchSchedule;
