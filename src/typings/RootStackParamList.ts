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
};

export type MainRootStackParamList = {
  Tabs: undefined;
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
