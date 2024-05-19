import {IconMapper} from './icons';

interface ProfileTypes {
  type: string;
  label: string;
  icon: JSX.Element;
  content?: string;
}

const CLUB_PROFILE: ProfileTypes[] = [
  {
    type: 'age',
    label: '클럽 연령',
    icon: IconMapper.StyledAgeIcon(),
  },
  {
    type: 'gender',
    label: '성별',
    icon: IconMapper.StyledGenderIcon(),
  },
  {
    type: 'level',
    label: '레벨',
    icon: IconMapper.StyledRankIcon(),
  },
  {
    type: 'location',
    label: '활동 지역',
    icon: IconMapper.StyledAddressIcon(),
  },
  {
    type: 'team_size',
    label: '클럽 인원',
    icon: IconMapper.StyledTeamSizeIcon(),
  },
  {
    type: 'fee',
    label: '회비',
    icon: IconMapper.StyledFeeIcon(),
  },
  {
    type: 'uniform',
    label: '유니폼',
    icon: IconMapper.StyledUniformIcon({className: 'color-gray-200'}),
  },
  {
    type: 'club_date',
    label: '클럽 창단일',
    icon: IconMapper.StyledClubIcon(),
  },
];

export const PLAYER_PROFILE: ProfileTypes[] = [
  {
    type: 'age',
    label: '나이',
    icon: IconMapper.StyledAgeIcon(),
  },
  {
    type: 'gender',
    label: '성별',
    icon: IconMapper.StyledGenderIcon(),
  },
  {
    type: 'level',
    label: '레벨',
    icon: IconMapper.StyledRankIcon(),
  },
  {
    type: 'location',
    label: '지역',
    icon: IconMapper.StyledAddressIcon(),
  },
  {
    type: 'position',
    label: '포지션',
    icon: IconMapper.StyledPositionIcon(),
  },
  {
    type: 'foot',
    label: '주발',
    icon: IconMapper.StyledFootIcon(),
  },
];

export const MATCH_POST_PROFILE: ProfileTypes[] = [
  {
    type: 'gender',
    label: '성별',
    icon: IconMapper.StyledGenderIcon(),
  },
  {
    type: 'level',
    label: '레벨',
    icon: IconMapper.StyledRankIcon(),
  },
  {
    type: 'team_size',
    label: '경기인원',
    icon: IconMapper.StyledMatchTeamSizeIcon(),
  },
  {
    type: 'match_fee',
    label: '구장비',
    icon: IconMapper.StyledFeeIcon(),
  },
];

export const GUEST_POST_PROFILE: ProfileTypes[] = [
  {
    type: 'gender',
    label: '성별',
    icon: IconMapper.StyledGenderIcon(),
  },
  {
    type: 'team_size',
    label: '경기인원',
    icon: IconMapper.StyledMatchTeamSizeIcon(),
  },
  {
    type: 'level',
    label: '레벨',
    icon: IconMapper.StyledRankIcon(),
  },
  {
    type: 'guest_size',
    label: '모집 인원',
    icon: IconMapper.StyledTeamSizeIcon(),
  },
  {
    type: 'position',
    label: '모집 포지션',
    icon: IconMapper.StyledPositionIcon(),
  },
  {
    type: 'match_fee',
    label: '참가비',
    icon: IconMapper.StyledFeeIcon(),
  },
];

export const MEMBER_POST_PROFILE: ProfileTypes[] = [
  {
    type: 'age',
    label: '나이',
    icon: IconMapper.StyledAgeIcon(),
  },
  {
    type: 'gender',
    label: '성별',
    icon: IconMapper.StyledGenderIcon(),
  },

  {
    type: 'level',
    label: '레벨',
    icon: IconMapper.StyledRankIcon(),
  },
  {
    type: 'location',
    label: '지역',
    icon: IconMapper.StyledAddressIcon(),
  },
  {
    type: 'position',
    label: '포지션',
    icon: IconMapper.StyledPositionIcon(),
  },
  {
    type: 'foot',
    label: '주발',
    icon: IconMapper.StyledFootIcon(),
  },
];

export const CLUB_POST_PROFILE: ProfileTypes[] = [
  {
    type: 'age_group',
    label: '연령대',
    icon: IconMapper.StyledAgeIcon(),
  },
  {
    type: 'gender',
    label: '성별',
    icon: IconMapper.StyledGenderIcon(),
  },
  {
    type: 'level',
    label: '레벨',
    icon: IconMapper.StyledRankIcon(),
  },
  {
    type: 'member_size',
    label: '모집 인원',
    icon: IconMapper.StyledTeamSizeIcon(),
  },
  {
    type: 'location',
    label: '지역',
    icon: IconMapper.StyledAddressIcon(),
  },
  {
    type: 'match_fee',
    label: '참가비',
    icon: IconMapper.StyledFeeIcon(),
  },
];

export const PROFILE_DATA = {
  CLUB_PROFILE,
  PLAYER_PROFILE,
  MATCH_POST_PROFILE,
  GUEST_POST_PROFILE,
  MEMBER_POST_PROFILE,
  CLUB_POST_PROFILE,
};
