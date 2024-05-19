import {ContentTypes} from './bottomSheetData';

type TabFilterMenuTypes = {
  type: 'LeagueMatch' | 'LeagueGuest' | 'LeagueClub';
  menues: MenusTypes[];
};

type MenusTypes = {
  type: ContentTypes;
  title: string;
};

const TAB_FILTER_MENUS: TabFilterMenuTypes[] = [
  {
    type: 'LeagueMatch',
    menues: [
      {
        type: 'location',
        title: '지역',
      },
      {
        type: 'date',
        title: '경기일시',
      },
      {
        type: 'level',
        title: '실력',
      },
      {
        type: 'team_size',
        title: '인원',
      },
      {
        type: 'gender',
        title: '성별',
      },
    ],
  },
  {
    type: 'LeagueGuest',
    menues: [
      {
        type: 'location',
        title: '지역',
      },
      {
        type: 'date',
        title: '경기일시',
      },
      {
        type: 'level',
        title: '실력',
      },
      {
        type: 'gender',
        title: '성별',
      },
    ],
  },
  {
    type: 'LeagueClub',
    menues: [
      {
        type: 'location',
        title: '지역',
      },
      {
        type: 'level',
        title: '실력',
      },
      {
        type: 'gender',
        title: '성별',
      },
      {
        type: 'age',
        title: '연령대',
      },
      {
        type: 'posting_type',
        title: '모집유형',
      },
    ],
  },
];

export const TOP_TAB_DATA = {
  TAB_FILTER_MENUS,
};
