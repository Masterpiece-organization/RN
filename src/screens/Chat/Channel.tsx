import {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {Avatar, Button, Text} from '@/components';
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  Send,
  SendProps,
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from 'react-native-gifted-chat';
import {ChatScreens, ChatScreenProps} from '@/types/navigationTypes';
import {StyledSendIcon} from '@/constants/icons';
import Clipboard from '@react-native-community/clipboard';

const handleMessageLongPress = (context, message) => {
  const options = ['복사', '취소하기'];
  const cancelButtonIndex = options.length - 1;

  context.actionSheet().showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
    },
    buttonIndex => {
      switch (buttonIndex) {
        case 0:
          Clipboard.setString(message.text);
          break;
      }
    },
  );
};

const renderInputToolbar = (
  props: InputToolbarProps<IMessage>,
  colorScheme: string | null | undefined,
) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: colorScheme === 'light' ? '#fff' : '#16181A',
        borderTopColor: colorScheme === 'light' ? '#ebedef' : '#3E4042',
      }}
    />
  );
};

const renderBubble = (
  props: BubbleProps<IMessage>,
  colorScheme: string | null | undefined,
) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#3D9BFF',
        },
        left: {
          backgroundColor: colorScheme === 'light' ? '#fff' : '#2A2C2E',
        },
      }}
      textStyle={{
        right: {
          color: '#fff',
        },
        left: {
          color: colorScheme === 'light' ? '#16181A' : '#fff',
        },
      }}
    />
  );
};

const renderSendButton = (props: SendProps<IMessage>) => {
  return (
    <Send {...props} disabled={!props.text} containerStyle={styles.sendButton}>
      <StyledSendIcon className="color-primary" width={32} height={32} />
    </Send>
  );
};

const Channel = ({navigation, route}: ChatScreenProps<ChatScreens.CHANNEL>) => {
  const colorScheme = useColorScheme();

  const [messages, setMessages] = useState([]);

  const createMessage = message => {
    // Simulate message sending locally
    const newMessage = {
      _id: Date.now(), // Generate unique ID for each message
      text: message,
      createdAt: new Date(),
      user: {
        _id: '1', // Different ID for simulated received message
        name: 'test',
        avatar: '',
      },
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleMessageSend = async messageList => {
    const newMessage = messageList[0].text; // Extract message content
    createMessage(newMessage);
    console.log('New message:', newMessage);
  };

  return (
    <SafeAreaView className="flex-1">
      <GiftedChat
        listViewProps={{
          backgroundColor: colorScheme === 'light' ? '#F2F4F6' : '#16181A',
        }}
        placeholder="메시지를 입력하세요."
        messages={messages}
        user={{_id: '1', name: 'test', avatar: ''}}
        textInputProps={{
          ...styles.textinput,
          backgroundColor: colorScheme === 'light' ? '#F2F4F6' : '#2A2C2E',
          color: colorScheme === 'light' ? '#16181A' : '#fff',
        }}
        onSend={handleMessageSend}
        renderInputToolbar={props => renderInputToolbar(props, colorScheme)}
        renderSend={renderSendButton}
        renderBubble={props => renderBubble(props, colorScheme)}
        renderUsernameOnMessage
        scrollToBottom
        bottomOffset={28}
        onLongPress={handleMessageLongPress}
        // alwaysShowSend
      />
    </SafeAreaView>
  );
};

export default Channel;

const styles = StyleSheet.create({
  sendButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    position: 'absolute',
    right: 8,
    top: 4,
  },

  textinput: {
    autoCapitalize: 'none',
    autoCorrent: false,
    textContentType: 'none',
    underlineColorAndroid: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 10,
    minHeight: 40,
    lineHeight: 20,
    marginRight: 15,
    marginLeft: 15,
    flex: 1,
    multiline: true,
    borderRadius: 20,
  },
});
