/* eslint-disable react-hooks/exhaustive-deps */
import {useLayoutEffect} from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ChatScreens,
  ChatStackParamList,
  BottomTabProps,
  BottomTabScreens,
} from '@/types/navigationTypes';
import {ChannelList, Channel} from '@/screens/Chat';
import getTabBarVisibilityOptions from '@/utils/getTabBarVisibilityOptions';
import useScreenOptions from '@/hooks/useScreenOptions';

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

const ChatStackScreen = ({
  navigation,
  route,
}: BottomTabProps<BottomTabScreens.CHAT_STACK>) => {
  const colorScheme = useColorScheme();

  const {getScreenOptions, getHeaderLeftText, getTabScreenOptions} =
    useScreenOptions<ChatStackParamList>();

  useLayoutEffect(() => {
    getTabBarVisibilityOptions({
      route,
      targetScreen: ChatScreens.CHANNEL_LIST,
      navigation,
      getTabScreenOptions,
    });
  }, [navigation, route, colorScheme]);

  return (
    <ChatStack.Navigator
      screenOptions={({navigation}) => ({
        ...getScreenOptions({
          navigation,
          // route,
        }),
      })}>
      <ChatStack.Screen
        name={ChatScreens.CHANNEL_LIST}
        component={ChannelList}
        options={() => {
          return {
            headerLeft: () => getHeaderLeftText('채팅'),
          };
        }}
      />
      <ChatStack.Screen name={ChatScreens.CHANNEL} component={Channel} />
    </ChatStack.Navigator>
  );
};

export default ChatStackScreen;
