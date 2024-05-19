import {REFERENCE_DATA} from '@/constants';

type ItemTypes = {
  title: string;
  data: string[];
};

export type ContentTypes =
  | 'location'
  | 'level'
  | 'team_size'
  | 'gender'
  | 'age'
  | 'posting_type';

export type BottomSheetListType = {
  title: string;
  height: string;
  isScrollable: boolean;
};

const BOTTOMSHEET_LIST: Partial<{[key in ContentTypes]: BottomSheetListType}> =
  {
    location: {
      title: '지역 선택',
      height: '75%',
      isScrollable: true,
    },
    level: {
      title: '축구레벨 선택',
      height: '47%',
      isScrollable: false,
    },
    team_size: {
      title: '경기인원 선택',
      height: '58%',
      isScrollable: true,
    },
    gender: {
      title: '성별 선택',
      height: '30%',
      isScrollable: false,
    },
  };

const BOTTOMSHEET_CONTENT_LIST: {[key in ContentTypes]: ItemTypes} = {
  location: {
    title: '지역 선택',
    data: REFERENCE_DATA.LOCATION,
  },
  level: {
    title: '축구레벨 선택',
    data: REFERENCE_DATA.LEVEL,
  },
  team_size: {
    title: '경기인원 선택',
    data: REFERENCE_DATA.TEAM_SIZE,
  },
  gender: {
    title: '성별 선택',
    data: REFERENCE_DATA.GENDER,
  },
  age: {
    title: '연령대 선택',
    data: REFERENCE_DATA.AGE,
  },
  posting_type: {
    title: '모집유형 선택',
    data: REFERENCE_DATA.POSTING_TYPE,
  },
};

export const BOTTOMSHEET_DATA = {
  BOTTOMSHEET_LIST,
  BOTTOMSHEET_CONTENT_LIST,
};
