const GENDER = ['남자', '여자', '혼성'];
const CLUB_GENDER = ['남자', '여자', '무관'];
const DOMINANT_FOOT = ['오른발', '왼발', '양발'];
const TEAM_SIZE = [
  '11 vs 11',
  '10 vs 10',
  '9 vs 9',
  '8 vs 8',
  '7 vs 7',
  '6 vs 6',
  '5 vs 5',
  '4 vs 4',
];
const INPUT_POSITIONS_LIST = [
  '공격수',
  '미드필더',
  '수비수',
  '골키퍼',
  '구분없음',
];
export const LEVEL = [
  '입문 레벨',
  '중급 레벨',
  '고급 레벨',
  '전문가 레벨',
  '엘리트 레벨',
];
export const AGE = ['10대', '20대', '30대', '40대', '50대', '연령무관'];
export const LOCATION = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
];
export const POSTING_TYPE = ['팀원 모집', '입단 신청'];

export const LEVEL_GUIDE = [
  {
    title: '입문 레벨',
    body: '축구에 막 입문하셨거나 경험이 아직 적으신 분들을 위한 레벨입니다.',
  },
  {
    title: '중급 레벨',
    body: '볼 컨트롤, 체력, 패스 등에 아직 조금 부족함이 느껴지시는 분들을 위한 레벨입니다.',
  },
  {
    title: '고급 레벨',
    body: '축구 기본기를 이미 익히셨지만, 아직은 안정성이 부족하신 분들을 위한 레벨입니다.',
  },
  {
    title: '전문가 레벨',
    body: '볼 컨트롤, 패스 등 모든 기본기가 수준급이며, 유소년 선수 경험이 있거나 그와 비슷한 실력을 가진 분들을 위한 레벨입니다.',
  },
  {
    title: '엘리트 레벨',
    body: '전문적인 기술을 보유하고, 모든 기본기에서 수준급을 보여주시는 분들을 위한 레벨입니다. 고등학교에서 선수 경험이 있거나 그와 비슷한 실력을 가진 분들에게 적합합니다.',
  },
];

export const POSITION_GUIDE = [
  {
    label: '공격수',
    positions: [
      {
        position: 'LW',
        body: '공격의 왼쪽 플랭크를 담당하며, 드리블과 크로스를 통해 공격을 구축하고 슈팅 기회를 만듭니다.',
      },
      {
        position: 'ST',
        body: '공격의 최전선에 서 있으며, 주로 득점을 담당합니다. 공을 잘 컨트롤하고 상대방 수비진을 뚫는 능력이 필요합니다.',
      },
      {
        position: 'RW',
        body: '공격의 오른쪽 플랭크를 맡아, 공격 참여와 골 기회 조성에 큰 역할을 합니다.',
      },
      {
        position: 'CF',
        body: '스트라이커와 비슷한 위치에 있지만, 더 자주 공을 만지고 다른 선수들과의 연계를 통해 공격을 조직합니다.',
      },
    ],
  },
  {
    label: '미드필더',
    positions: [
      {
        position: 'CAM',
        body: '미드필더와 공격수 사이의 연결 역할을 하며, 공격 기회를 창출하고 때로는 직접 슈팅에 들어갑니다.',
      },
      {
        position: 'LM',
        body: '필드 왼쪽을 주로 담당하며, 수비와 공격 사이의 밸런스를 유지합니다.',
      },
      {
        position: 'CM',
        body: '필드 중앙에서 공을 조율하고, 전략적인 패스를 통해 팀의 공격 리듬을 만듭니다.',
      },
      {
        position: 'RM',
        body: '필드 오른쪽에서 플레이하며, 양쪽의 역할을 겸비한 중용한 선수입니다.',
      },
    ],
  },
  {
    label: '수비수',
    positions: [
      {
        position: 'LWB',
        body: '주로 수비적 역할을 하지만 필요 시 공격에 참여하여 왼쪽 측면을 활성화시킵니다.',
      },
      {
        position: 'CDM',
        body: '팀의 수비를 지원하고 중앙 미드필더 앞에서 상대 팀의 공격을 막는 보호막 역할을 합니다.',
      },
      {
        position: 'RWB',
        body: '오른쪽 측면을 담당하며, 수비는 물론이고 공격 참여 역시 활발히 이루어집니다.',
      },
      {
        position: 'LB',
        body: '수비의 왼쪽을 담당하며, 측면을 타고 상대의 공격을 막고 팀의 공격을 시작합니다.',
      },
      {
        position: 'CB',
        body: '수비의 핵심으로, 골대를 보호하고 상대방의 중요한 공격수를 마크합니다.',
      },
      {
        position: 'RB',
        body: '수비의 오른쪽을 책임지며, 필요할 때는 전방적인 공격에 참여하기도 합니다.',
      },
    ],
  },
  {
    label: '골키퍼',
    positions: [
      {
        position: 'GK',
        body: '팀의 마지막 수비수로, 골대를 지키는 역할을 합니다. 골키퍼는 반사 신경, 집중력, 그리고 공중볼 처리 능력이 중요합니다.',
      },
    ],
  },
];

export const ICON_COUNTS = [
  {
    count: 3,
    postion: ['LW', 'ST', 'RW'],
    id: [14, 13, 12],
  },
  {
    count: 2,
    postion: ['CF', 'CAM'],
    id: [15, 11],
  },
  {
    count: 3,
    postion: ['LM', 'CM', 'RM'],
    id: [10, 9, 8],
  },
  {
    count: 3,
    postion: ['LWB', 'CDM', 'RWB'],
    id: [6, 7, 3],
  },
  {
    count: 3,
    postion: ['LB', 'CB', 'RB'],
    id: [5, 4, 2],
  },
  {
    count: 1,
    postion: ['GK'],
    id: [1],
  },
];

const POST_MENUS = [
  '입단 신청글 작성',
  '팀원 모집글 작성',
  '용병 모집글 작성',
  '경기 모집글 작성',
];

export const REFERENCE_DATA = {
  GENDER,
  CLUB_GENDER,
  DOMINANT_FOOT,
  TEAM_SIZE,
  INPUT_POSITIONS_LIST,
  LEVEL,
  AGE,
  LOCATION,
  LEVEL_GUIDE,
  POSITION_GUIDE,
  ICON_COUNTS,
  POSTING_TYPE,
  POST_MENUS,
};
