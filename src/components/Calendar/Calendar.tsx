import {CalendarList, LocaleConfig, DateData} from 'react-native-calendars';
import {MarkedDates, Theme} from 'react-native-calendars/src/types';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Text} from '@/components/index';
import moment from 'moment';
import {useCallback, useState, useMemo} from 'react';
import {StyledLeftIcon, StyledRightIcon} from '@/constants/icons';

export interface CalendarProps {
  markedDates?: MarkedDates;
  isPastEnabled?: boolean;
  onDayPress: (selectedDay: DateData) => void;
}

LocaleConfig.defaultLocale = 'kr';
LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['월', '화', '수', '목', '금', '토', '일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  //   today: '오늘',
};

const today = moment().format('YYYY-MM-DD');
const oneMonthAfterDay = moment(today).add(1, 'months').format('YYYY-MM-DD');
const twelveMonthsLater = moment().add(12, 'months').format('YYYY-MM-DD'); // 오늘로부터 12개월 후의 날짜를 'YYYY-MM-DD' 형식으로 표현

const windowWidth = Dimensions.get('window').width;

const theme: Theme = {
  arrowColor: '#3D9BFF',
  arrowStyle: {marginBottom: 4},
  textDayFontWeight: 'bold',
  textSectionTitleColor: '#A2A4A6',
  textMonthFontWeight: 'bold',
  selectedDayBackgroundColor: '#3D9BFF',
  todayTextColor: '#3D9BFF',
  dotColor: '#3D9BFF',
  textDayFontFamily: 'WantedSans-Bold',
  textMonthFontFamily: 'WantedSans-Bold',
  textDayHeaderFontFamily: 'WantedSans-Bold',
  todayButtonFontFamily: 'WantedSans-Bold',
  // calendarBackground: 'transparent',
};

const renderArrow = (
  currentMonth: string,
  handleArrowPress: (direction: string) => void,
) => {
  return (
    <View className="absolute top-5 w-full flex-row justify-between px-4">
      <TouchableOpacity
        className="p-3"
        onPress={() =>
          currentMonth === today ||
          currentMonth < today ||
          handleArrowPress('left')
        }>
        <StyledLeftIcon
          className={`color-primary  ${
            (currentMonth === today || currentMonth < today) && 'color-gray-100'
          }`}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="p-3"
        onPress={() => handleArrowPress('right')}>
        <StyledRightIcon
          className={`color-primary  ${
            currentMonth === twelveMonthsLater && 'color-gray-100'
          }`}
        />
      </TouchableOpacity>
    </View>
  );
};

const renderHeader = (date?: XDate) => {
  if (!date) {
    return null;
  }

  const momentDate = moment(date.toDate());
  const currentMonth = momentDate.format('M');
  const currentYear = moment().format('YYYY');
  const selectedYear = momentDate.format('YYYY');

  return (
    <Text weight="bold" className="mb-1">
      {currentYear === selectedYear
        ? `${currentMonth}월`
        : `${currentMonth}월 ${selectedYear}년`}
    </Text>
  );
};

const CalendarComponent = ({
  isPastEnabled = false,
  markedDates,
  onDayPress,
}: CalendarProps) => {
  const colorScheme = useColorScheme();

  const dynamicStyles = useMemo(
    () => ({
      ...theme,
      calendarBackground: colorScheme === 'light' ? '#fff' : '#2A2C2E',
      dayTextColor: colorScheme === 'light' ? '#16181A' : '#fff',
      textDisabledColor: colorScheme === 'light' ? '#DEE0E2' : '#525456',
      textInactiveColor: colorScheme === 'light' ? '#DEE0E2' : '#525456',
    }),
    [colorScheme],
  );

  const [currentMonth, setCurrentMonth] = useState(today);

  const handleArrowPress = useCallback(
    (direction: string) => {
      if (direction === 'left') {
        if (moment(currentMonth).isSame(moment(today), 'month')) {
          return;
        }
        if (currentMonth === oneMonthAfterDay) {
          setCurrentMonth(current =>
            moment(current).subtract(2, 'months').format('YYYY-MM-DD'),
          );
        }

        setCurrentMonth(current =>
          moment(current).subtract(1, 'months').format('YYYY-MM-DD'),
        );
      } else if (direction === 'right') {
        if (moment(currentMonth).isSame(moment(twelveMonthsLater), 'month')) {
          return;
        }
        setCurrentMonth(current =>
          moment(current).add(1, 'months').format('YYYY-MM-DD'),
        );
      }
    },
    [currentMonth],
  );

  const handleChangeMonth = useCallback(({dateString}: DateData) => {
    setCurrentMonth(dateString);
  }, []);

  return (
    <>
      <CalendarList
        current={currentMonth}
        onDayPress={onDayPress}
        minDate={isPastEnabled ? undefined : today}
        maxDate={twelveMonthsLater}
        markedDates={markedDates}
        hideExtraDays={false}
        hideArrows={true}
        showSixWeeks={true}
        horizontal
        pagingEnabled
        pastScrollRange={isPastEnabled ? 6 : 0}
        futureScrollRange={12}
        calendarWidth={windowWidth - 30}
        renderHeader={renderHeader}
        theme={dynamicStyles}
        style={styles.container}
        staticHeader
        onMonthChange={handleChangeMonth}
      />
      {renderArrow(currentMonth, handleArrowPress)}
    </>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 'auto',
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
});
