import {EditProfile} from '@/screens/Setting/EditProfile';
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: {email: string};
  Terms: undefined;
  Success: {
    name: string;
  };
  FindPw: undefined;
  ResetPw: {email: string};
  CheckEmail: undefined;
  Nickname: undefined;
  Position: {nickname: string};
  Profile: undefined;
  EditProfile: undefined;
};

export type MainRootStackParamList = {
  Tabs: undefined;
  Setting: undefined;
};

export type MainRootTabsParamList = {
  Main: undefined;
  Matches: undefined;
  Team: undefined;
  Profile: undefined;
};

export interface BottomIconWrapTypes {
  color: string;
  focused: boolean;
}
