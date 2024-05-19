/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useMemo} from 'react';
import {StyleSheet, useColorScheme, TouchableOpacity} from 'react-native';
import {BottomSheet, BottomSheetContent, CalendarComponent} from '@/components';
import RNCalendarStrip from 'react-native-calendar-strip';
import moment, {Moment} from 'moment';
import {StyledCalendarIcon} from '@/constants/icons';
import {MarkedDates} from 'react-native-calendars/src/types';
import useBottomSheet from '@/hooks/useBottomSheet';

require('moment/locale/ko');
moment.locale('ko');

interface CalendarStripProps {
  selectedDate?: Moment | Date | undefined;
  markedDates?: MarkedDates;
  stripMarkedDates?: any[];
  data?: any;
  onDateSelected: (date: Moment) => void;
}

const today = moment();
const datesBlacklist = [
  {
    start: moment(0),
    end: moment().subtract(1, 'day'),
  },
];

const maxDate = moment().add(6, 'months');

const CalendarStrip = ({
  selectedDate,
  markedDates,
  stripMarkedDates,
  onDateSelected,
}: CalendarStripProps) => {
  const colorScheme = useColorScheme();
  const {bottomSheetRef, open, close} = useBottomSheet();

  const dynamicStyles = useMemo(
    () => ({
      container: {
        ...styles.container,
        backgroundColor: colorScheme === 'light' ? '#fff' : '#16181A',
      },
      calendarHeaderStyle: {
        ...styles.dateNumberStyle,
        marginBottom: 12,
        color: colorScheme === 'light' ? '#16181A' : '#fff',
      },
      dateNameStyle: {
        ...styles.dateNameStyle,
        color: colorScheme === 'light' ? '#525456' : '#A2A4A6',
      },
      dateNumberStyle: {
        ...styles.dateNumberStyle,
        color: colorScheme === 'light' ? '#16181A' : '#fff',
      },
    }),
    [colorScheme],
  );

  const handleDateSelected = useCallback((date: any) => {
    close();
    onDateSelected(moment(date.dateString || date));
  }, []);

  const handlePresentModalPress = useCallback(() => {
    open();
  }, []);

  return (
    <>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent>
          <CalendarComponent
            onDayPress={handleDateSelected}
            markedDates={markedDates}
          />
        </BottomSheetContent>
      </BottomSheet>

      <TouchableOpacity
        onPress={handlePresentModalPress}
        className="absolute right-5 top-2.5 z-20 flex-row items-center justify-center">
        <StyledCalendarIcon className="color-gray-100" />
      </TouchableOpacity>

      <RNCalendarStrip
        style={dynamicStyles.container}
        scrollable={true}
        startingDate={today}
        selectedDate={selectedDate}
        useIsoWeekday={false}
        minDate={today}
        maxDate={maxDate}
        calendarHeaderStyle={dynamicStyles.calendarHeaderStyle}
        calendarHeaderFormat={'YYYY.MM'}
        dateNumberStyle={dynamicStyles.dateNumberStyle}
        dateNameStyle={dynamicStyles.dateNameStyle}
        highlightDateNumberStyle={styles.highlightDateNumberStyle}
        highlightDateNameStyle={styles.highlightDateNameStyle}
        disabledDateNameStyle={styles.disabledDateNameStyle}
        disabledDateNumberStyle={styles.disabledDateNumberStyle}
        onDateSelected={handleDateSelected}
        leftSelector={[]}
        rightSelector={[]}
        datesBlacklist={datesBlacklist}
        markedDates={stripMarkedDates}
      />
    </>
  );
};

export default CalendarStrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 16,
  },
  dateNumberStyle: {
    fontSize: 16,
    fontFamily: 'WantedSans-Bold',
  },
  dateNameStyle: {
    fontSize: 14,
    fontFamily: 'WantedSans-SemiBold',
    marginBottom: 4,
  },
  highlightDateNumberStyle: {
    fontSize: 16,
    fontFamily: 'WantedSans-Bold',
    color: '#3D9BFF',
  },
  highlightDateNameStyle: {
    fontSize: 14,
    fontFamily: 'WantedSans-SemiBold',
    marginBottom: 4,
    color: '#3D9BFF',
  },
  disabledDateNameStyle: {
    fontSize: 14,
    fontFamily: 'WantedSans-SemiBold',
    marginBottom: 4,
    color: '#A2A4A6',
  },
  disabledDateNumberStyle: {
    fontSize: 16,
    fontFamily: 'WantedSans-Bold',
    color: '#A2A4A6',
  },
});
