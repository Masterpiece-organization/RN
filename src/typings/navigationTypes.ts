import {
  RouteProp,
  ParamListBase,
  CompositeScreenProps,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export interface ScreenOptionParams {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}

// App
export type AppStackParamList =
  | CommonScreenParamList
  | AuthStackParamList
  | SettingStackParamList
  | MainStackParamList
  | MatchPostStackParamList
  | LocationSearchStackParamList
  | GuestPostStackParamList
  | ClubPostStackParamList
  | MemberPostStackParamList
  | LeagueStackParamList
  | LeagueTopTabStackParamList
  | ChatStackParamList
  | ClubStackParamList
  | BottomTabParamList;

export type AppScreens =
  | CommonScreens
  | AuthScreens
  | SettingScreens
  | MainScreens
  | MatchPostScreens
  | LocationSearchScreens
  | GuestPostScreens
  | ClubPostScreens
  | MemberPostScreens
  | LeagueScreens
  | LeagueTopTabScreens
  | ChatScreens
  | ClubScreens
  | BottomTabScreens;

/**
 * COMMON STACKS
 */
export type clubSelectionTypes = "match" | "guest" | "clubPosting";

export enum CommonScreens {
  POSITION_SETUP = "PositionSetup",
  POSITION_GUIDE = "PositionGuide",
  SUCCESS = "Success",
  LEVEL_GUIDE = "LevelGuide",
  PLAYER_PROFILE = "PlayerProfile",
  CLUB_PROFILE = "ClubProfile",
  POST_DETAIL = "PostDetail",
  CLUB_SELECTION = "ClubSelection",
  MATCH_HISTORY = "MatchHistory",
  MATCH_SCHEDULE = "MatchSchedule",
  MATCH_POST_DETAIL_SCREEN = "MatchPostDetailScreen",
  GUEST_POST_DETAIL_SCREEN = "GuestPostDetailScreen",
  CLUB_POST_DETAIL_SCREEN = "ClubPostDetailScreen",
  MEMBER_POST_DETAIL_SCREEN = "MemberPostDetailScreen",
  MAP_SCREEN = "MapScreen",
}

export type CommonScreenParamList = {
  [CommonScreens.POSITION_SETUP]: { type?: string; nickName?: string };
  [CommonScreens.POSITION_GUIDE]: undefined;
  [CommonScreens.LEVEL_GUIDE]: undefined;
  [CommonScreens.PLAYER_PROFILE]: { name: string; id: number };
  [CommonScreens.CLUB_PROFILE]: { name: string; id: number };
  [CommonScreens.POST_DETAIL]: undefined;
  [CommonScreens.SUCCESS]: { type?: string };
  [CommonScreens.CLUB_SELECTION]: { type: clubSelectionTypes };
  [CommonScreens.MATCH_HISTORY]: undefined;
  [CommonScreens.MATCH_SCHEDULE]: { type?: string };
  [CommonScreens.MATCH_POST_DETAIL_SCREEN]: undefined;
  [CommonScreens.GUEST_POST_DETAIL_SCREEN]: undefined;
  [CommonScreens.CLUB_POST_DETAIL_SCREEN]: undefined;
  [CommonScreens.MEMBER_POST_DETAIL_SCREEN]: undefined;
  [CommonScreens.MAP_SCREEN]: { latitude?: any; longitude?: any; type: string };
};

export type CommonScreenProps = NativeStackScreenProps<CommonScreenParamList>;

/**
 * AUTH STACKS
 */
export const enum AuthScreens {
  ONBOARDING = "OnBoarding",
  EMAIL_CHECK = "EmailCheck",
  VERIFICATION_NUMBER = "VerificationNumber",
  PASSWORD = "Password",
  LOGIN = "Login",
  TERMS = "Terms",
  NICKNAME_SETUP = "NicknameSetup",
}

export type AuthStackParamList = {
  [AuthScreens.ONBOARDING]: undefined;
  [AuthScreens.EMAIL_CHECK]: { type: string };
  [AuthScreens.VERIFICATION_NUMBER]: { type: string; email: string };
  [AuthScreens.PASSWORD]: { type: string; email: string };
  [AuthScreens.LOGIN]: undefined;
  [AuthScreens.TERMS]: undefined;
  [AuthScreens.NICKNAME_SETUP]: undefined;
} & CommonScreenParamList;

export type AuthScreenProps<Screen extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, Screen>,
    CommonScreenProps
  >;

/**
 * SETTING STACKS
 */
export enum SettingScreens {
  MY_PAGE = "MyPage",
  MATCH_HISTORY = "MatchHistory",
  SETTING = "Setting",
  SETTING_DETAIL = "SettingDetail",
  FAQ = "Faq",
  FAQ_DETAIL = "FaqDetail",
  UPLOADED_POST = "UploadedPost",
  PROFILE_EDIT = "ProfileEdit",
}

export type SettingStackParamList = {
  [SettingScreens.MY_PAGE]: undefined;
  [SettingScreens.MATCH_HISTORY]: undefined;
  [SettingScreens.SETTING]: undefined;
  [SettingScreens.SETTING_DETAIL]: { type: string };
  [SettingScreens.FAQ]: undefined;
  [SettingScreens.FAQ_DETAIL]: { id: number };
  [SettingScreens.UPLOADED_POST]: { id: number };
  [SettingScreens.PROFILE_EDIT]: undefined;
} & CommonScreenParamList;

export type SettingScreenProps<Screen extends keyof SettingStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SettingStackParamList, Screen>,
    CommonScreenProps
  >;

/**
 * MAIN STACKS
 */
export enum MainScreens {
  MAIN = "Main",
  MATCH_NOTIFICATION = "MatchNotification",
  MATCH_POST_STACK = "MatchPostStack",
  GUEST_POST_STACK = "GuestPostStack",
  CLUB_POST_STACK = "ClubPostStack",
  MEMBER_POST_STACK = "MemberPostStack",
  NOTIFICATION = "Notification",
}

export type MainStackParamList = {
  [MainScreens.MAIN]: undefined;
  [MainScreens.MATCH_NOTIFICATION]: undefined;
  [MainScreens.MATCH_POST_STACK]: undefined;
  [MainScreens.GUEST_POST_STACK]: undefined;
  [MainScreens.CLUB_POST_STACK]: undefined;
  [MainScreens.MEMBER_POST_STACK]: undefined;
  [MainScreens.NOTIFICATION]: undefined;
} & CommonScreenParamList;

export type MainScreenProps<Screen extends keyof MainStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainStackParamList, Screen>,
    CommonScreenProps
  >;

// MATCH POST STACKS
export enum MatchPostScreens {
  MATCH_TYPE_SELECTION = "MatchTypeSelection",
  MATCH_DATE_SELECTION = "MatchDateSelection",
  MATCH_LOCATION_SELECTION = "MatchLocationSelection",
  MATCH_DETAIL_INPUTS = "MatchDetailInputs",
  MATCH_ANNOUNCEMENT_INPUTS = "MatchAnnouncementInputs",
  LOCATION_SEARCH_STACK = "LocationSearchStack",
}

export type MatchPostStackParamList = {
  [MatchPostScreens.MATCH_TYPE_SELECTION]: undefined;
  [MatchPostScreens.MATCH_DATE_SELECTION]: undefined;
  [MatchPostScreens.MATCH_LOCATION_SELECTION]: undefined;
  [MatchPostScreens.MATCH_DETAIL_INPUTS]: { type: string };
  [MatchPostScreens.MATCH_ANNOUNCEMENT_INPUTS]: undefined;
  [MatchPostScreens.LOCATION_SEARCH_STACK]: undefined;
} & CommonScreenParamList;

export type MatchPostScreenProps<Screen extends keyof MatchPostStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MatchPostStackParamList, Screen>,
    CommonScreenProps
  >;

// LOCATION SEARCH STACK
export enum LocationSearchScreens {
  LOCATION_SEARCH = "LocationSearch",
  LOCATION_DETAIL = "LocationDetail",
}

export type LocationSearchStackParamList = {
  [LocationSearchScreens.LOCATION_SEARCH]: undefined;
  [LocationSearchScreens.LOCATION_DETAIL]: { data: any; details: any };
} & CommonScreenParamList;

export type LocationSearchScreenProps<
  Screen extends keyof LocationSearchStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<LocationSearchStackParamList, Screen>,
  MatchPostScreenProps<keyof MatchPostStackParamList>
>;

// Guest Post
export enum GuestPostScreens {
  GUEST_MATCH_SELECTION = "GeustMatchSelection",
  GUEST_DETAIL_INPUTS = "GuestDetailInputs",
  GUEST_ANNOUNCEMENT_INPUTS = "GuestAnnouncementInputs",
}

export type GuestPostStackParamList = {
  [GuestPostScreens.GUEST_MATCH_SELECTION]: undefined;
  [GuestPostScreens.GUEST_DETAIL_INPUTS]: undefined;
  [GuestPostScreens.GUEST_ANNOUNCEMENT_INPUTS]: undefined;
} & CommonScreenParamList;

export type GuestPostScreenProps<Screen extends keyof GuestPostStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<GuestPostStackParamList, Screen>,
    CommonScreenProps
  >;

// CLUB POST STACK
export enum ClubPostScreens {
  CLUB_DETAIL_INPUTS = "ClubDetailInputs",
  CLUB_ANNOUNCEMENT_INPUTS = "ClubAnnouncementInputs",
}

export type ClubPostStackParamList = {
  [ClubPostScreens.CLUB_DETAIL_INPUTS]: undefined;
  [ClubPostScreens.CLUB_ANNOUNCEMENT_INPUTS]: undefined;
} & CommonScreenParamList;

export type ClubPostScreenProps<Screen extends keyof ClubPostStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ClubPostStackParamList, Screen>,
    CommonScreenProps
  >;

// MEMBER POST STACK
export enum MemberPostScreens {
  MEMBER_ANNOUNCEMENT_INPUTS = "MemberAnnouncementInputs",
}

export type MemberPostStackParamList = {
  [MemberPostScreens.MEMBER_ANNOUNCEMENT_INPUTS]: undefined;
} & CommonScreenParamList;

export type MemberPostScreenProps<
  Screen extends keyof MemberPostStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<MemberPostStackParamList, Screen>,
  CommonScreenProps
>;

/**
 * LEAGUE STACK
 */
export enum LeagueScreens {
  LEAGUE_MAIN_TAB = "LeagueMainTab",
}

export type LeagueStackParamList = {
  [LeagueScreens.LEAGUE_MAIN_TAB]: undefined;
} & MainStackParamList &
  CommonScreenParamList;

export type LeagueScreenProps<Screen extends keyof LeagueStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<LeagueStackParamList, Screen>,
    CommonScreenProps
  >;

export enum LeagueTopTabScreens {
  LEAGUE_MATCH = "LeagueMatch",
  LEAGUE_GUEST = "LeagueGuest",
  LEAGUE_CLUB = "LeagueClub",
}

export type LeagueTopTabStackParamList = {
  [LeagueTopTabScreens.LEAGUE_MATCH]: undefined;
  [LeagueTopTabScreens.LEAGUE_GUEST]: undefined;
  [LeagueTopTabScreens.LEAGUE_CLUB]: undefined;
} & CommonScreenParamList;

export type LeagueTopTabScreenProps<
  Screen extends keyof LeagueTopTabStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<LeagueTopTabStackParamList, Screen>,
  CommonScreenProps
>;

/**
 * CHAT STACK
 */
export const enum ChatScreens {
  CHANNEL_LIST = "ChannelList",
  CHANNEL = "Channel",
}

export type ChatStackParamList = {
  [ChatScreens.CHANNEL_LIST]: undefined;
  [ChatScreens.CHANNEL]: undefined;
} & CommonScreenParamList;

export type ChatScreenProps<Screen extends keyof ChatStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ChatStackParamList, Screen>,
    CommonScreenProps
  >;

/**
 * CLUB STACK
 */
export const enum ClubScreens {
  CLUB_MAIN = "ClubMain",
  CLUB_SEARCH = "ClubSearch",
  CLUB_CREATION = "ClubCreating",
  CLUB_DETAIL_TAB = "ClubDetailTab",
}

export type ClubStackParamList = {
  [ClubScreens.CLUB_MAIN]: undefined;
  [ClubScreens.CLUB_SEARCH]: undefined;
  [ClubScreens.CLUB_CREATION]: undefined;
  [ClubScreens.CLUB_DETAIL_TAB]: undefined;
} & CommonScreenParamList;

export type ClubScreenProps<Screen extends keyof ClubStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ClubStackParamList, Screen>,
    CommonScreenProps
  >;

export const enum ClubManagementTabScreens {
  CLUB_SQUAD_MANAGEMENT = "ClubSquadManagement",
  CLUB_LINEUP_MANAGEMENT = "ClubLineupManagement",
}
export type ClubManagementTabParamList = {
  [ClubManagementTabScreens.CLUB_SQUAD_MANAGEMENT]: undefined;
  [ClubManagementTabScreens.CLUB_LINEUP_MANAGEMENT]: undefined;
};

export const enum ClubDetailScreens {
  CLUB_INFO = "ClubInfo",
  CLUB_SCHEDULE = "ClubSchedule",
  CLUB_MANAGEMENT = "ClubManagement",
}

export type ClubDetailTabParamList = {
  [ClubDetailScreens.CLUB_INFO]: undefined;
  [ClubDetailScreens.CLUB_SCHEDULE]: undefined;
  [ClubDetailScreens.CLUB_MANAGEMENT]: undefined;
} & CommonScreenParamList;

/**
 * BOTTOM TAB
 * */
export enum BottomTabScreens {
  MAIN_STACK = "MainStack",
  LEAGUE_STACK = "LeagueStack",
  CHAT_STACK = "ChatStack",
  CLUB_STACK = "ClubStack",
  SETTING_STACK = "SettingStack",
}

export type BottomTabParamList = {
  [BottomTabScreens.MAIN_STACK]: undefined;
  [BottomTabScreens.LEAGUE_STACK]: undefined;
  [BottomTabScreens.CHAT_STACK]: undefined;
  [BottomTabScreens.CLUB_STACK]: undefined;
  [BottomTabScreens.SETTING_STACK]: undefined;
};

export type BottomTabProps<Screen extends keyof BottomTabParamList> =
  BottomTabScreenProps<BottomTabParamList, Screen>;
