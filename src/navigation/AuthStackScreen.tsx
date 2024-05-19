import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  OnBoarding,
  Login,
  EmailCheck,
  Terms,
  VerificationNumber,
  Password,
  NicknameSetup,
} from '@/screens/Auth';
import {PositionSetup, PositionGuide, Success} from '@/screens/Common';
import useScreenOptions from '@/hooks/useScreenOptions';
import {
  AuthStackParamList,
  AuthScreens,
  CommonScreens,
} from '@/types/navigationTypes';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
  const {getScreenOptions, getHeaderLeft, getHeaderRight} =
    useScreenOptions<AuthStackParamList>();

  return (
    <AuthStack.Navigator initialRouteName={AuthScreens.ONBOARDING}>
      <AuthStack.Screen
        name={AuthScreens.ONBOARDING}
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={CommonScreens.SUCCESS}
        component={Success}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Group
        screenOptions={({navigation}) => ({
          ...getScreenOptions({
            navigation,
            // route,
          }),
        })}>
        <AuthStack.Screen name={AuthScreens.LOGIN} component={Login} />
        <AuthStack.Screen name={AuthScreens.TERMS} component={Terms} />
        <AuthStack.Screen
          name={AuthScreens.EMAIL_CHECK}
          component={EmailCheck}
        />
        <AuthStack.Screen
          name={AuthScreens.VERIFICATION_NUMBER}
          component={VerificationNumber}
        />
        <AuthStack.Screen
          name={AuthScreens.PASSWORD}
          component={Password}
          options={({navigation}) => ({
            headerLeft: () => getHeaderLeft(navigation, true),
          })}
        />
        <AuthStack.Screen
          name={AuthScreens.NICKNAME_SETUP}
          component={NicknameSetup}
        />
        <AuthStack.Screen
          name={CommonScreens.POSITION_GUIDE}
          component={PositionGuide}
        />
        <AuthStack.Screen
          name={CommonScreens.POSITION_SETUP}
          component={PositionSetup}
          options={({navigation}) => ({
            headerRight: () =>
              getHeaderRight({
                hasRightContent: '포지션 정보',
                onPress: () =>
                  navigation.navigate(CommonScreens.POSITION_GUIDE),
              }),
          })}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
