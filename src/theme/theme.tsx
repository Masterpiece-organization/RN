import {StyleSheet} from 'react-native';

export const containerStyle = (type = 'card') =>
  `${type === 'card' ? 'px-[15px]' : 'px-5'} pt-4 flex-1`;

export const cardBackground = 'bg-gray-50 dark:bg-black';

export const commonStyles = StyleSheet.create({
  tabStyle: {
    paddingTop: 16,
    height: 82,
    paddingHorizontal: 10,
    borderStartStartRadius: 24,
    borderStartEndRadius: 24,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    position: 'absolute',
    overflow: 'hidden',
  },
  tabLabelStyle: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'WantedSans-Regular',
  },
});

export const matchListWrtapStyle =
  'flex-row items-center rounded-lg bg-white px-5 py-4';

export const defaultInputStyle =
  'px-5 h-[54px] justify-center border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950';

export const defaultButtonStyle =
  'w-100 min-h-[54px] py-4 flex-row items-center justify-center rounded-lg rounded-lg px-5 active:scale-[.99] z-10';

export const defualtOutlinedStyle =
  'border border-gray-100 dark:border-gray-700 active:border-primary';

export const defaultAvartarWrapStyle =
  'items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600 border border-gray-100 dark:border-gray-600';
