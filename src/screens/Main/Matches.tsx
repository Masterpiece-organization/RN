import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import Stomp, {Client} from '@stomp/stompjs';

interface Content {
  content: string;
  sender?: string;
}

const Matches = () => {
  const [userId, setUserId] = useState(''); // 사용자 ID를 입력받을 상태
  const [client, setClient] = useState<Stomp.Client | null>(null);
  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState([]);
  const [chatroomId, setChatRoomId] = useState<string>();
  const [messages, setMessages] = useState<Content[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');

  async function creatChatroom() {
    setChatRoomId('test_queue.0');
  }

  useEffect(() => {
    const initializeChat = async () => {
      try {
        // await creatChatroom(); // 채팅 룸이 생성될 때까지 기다립니다.

        const stomp = new Client({
          brokerURL: 'ws://52.79.239.1:15674/ws',
          // connectHeaders: {
          //   Authorization: `Bearer ${access}`,
          // },
          connectHeaders: {
            login: 'guest',
            passcode: 'guest',
          },
          debug: (str: string) => {
            console.log('---debug---', str);
          },
          reconnectDelay: 5000, //자동 재 연결
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });
        setClient(stomp);

        stomp.activate();

        stomp.onConnect = () => {
          console.log('WebSocket 연결이 열렸습니다.');
          // const subscriptionDestination = `/topic/${chatroomId}.#`;
          const subscriptionDestination = '/topic/test_queue.0.#';
          // const subscriptionDestination = '/topic/user.1.#';

          stomp.subscribe(subscriptionDestination, frame => {
            try {
              console.log('----frame---', frame);
              const parsedMessage = JSON.parse(frame.body);

              console.log(parsedMessage);
              setMessages(prevMessages => [...prevMessages, parsedMessage]);
            } catch (error) {
              console.error('오류가 발생했습니다:', error);
            }
          });
        };
      } catch (error) {
        console.error('채팅 룸 생성 중 오류가 발생했습니다:', error);
      }
    };

    // 채팅 초기설정
    initializeChat();

    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, []);
  // }, [chatroomId]);

  const sendMessage = () => {
    // 메시지 전송
    if (client && client.connected) {
      // const destination = `/topic/${chatroomId}.chat`;
      const destination = '/topic/test_queue.0.chat';

      client.publish({
        destination,
        body: JSON.stringify({
          content: inputMessage,
          sender: userName,
        }),
      });
    }

    setInputMessage('');
  };

  return (
    <View className="px-4">
      {messages.map((message, index) => (
        <View key={index}>
          <Text>{message.sender}</Text>
          <Text>{message.content}</Text>
        </View>
      ))}

      <View className="flex-row">
        <TextInput
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Enter your message"
          className="flex-1 border border-black p-2"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   myMessageContainer: {
//     alignSelf: 'flex-end',
//     margin: 5,
//   },
//   otherMessageContainer: {
//     alignSelf: 'flex-start',
//     margin: 5,
//   },
//   myMessage: {
//     backgroundColor: '#DCF8C6',
//     padding: 10,
//     borderRadius: 10,
//   },
//   otherMessage: {
//     backgroundColor: '#ECECEC',
//     padding: 10,
//     borderRadius: 10,
//   },
// });

export default Matches;

{
  /* <TextInput
        value={userId}
        onChangeText={setUserId}
        placeholder="Enter your user ID"
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginBottom: 10,
        }}
      /> */
}
{
  /* <FlatList
        data={chatList}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
      /> */
}
{
  /* <TextInput
        value={chat}
        onChangeText={setChat}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Button title="Send" onPress={sendChat} /> */
}

// const connect = () => {
//   console.log('---connecting---');
//   // 소켓 연결
//   try {
//     const clientdata = new StompJs.Client({
//       brokerURL: 'ws://52.79.239.1:15674/ws',
//       connectHeaders: {
//         login: 'guest',
//         passcode: 'guest',
//       },
//       debug: function (str) {
//         console.log('-----debug-----', str);
//       },
//       reconnectDelay: 5000, // 자동 재 연결
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });

//     // 구독
//     clientdata.onConnect = function (e) {
//       // console.log('---connected----', e);
//       // clientdata.subscribe('/topic/user.1', callback);

//       // const subscription = clientdata.subscribe('/topic/user.1.#', callback);
//       const subscription = clientdata.subscribe(
//         // '/topic/test_queue',
//         '/queue/test_queue',
//         callback,
//       );
//       console.log('-----subscription-----', subscription);
//     };

//     clientdata.onStompError = function (frame) {
//       // Will be invoked in case of error encountered at Broker
//       // Bad login/passcode typically will cause an error
//       // Complaint brokers will set `message` header with a brief message. Body may contain details.
//       // Compliant brokers will terminate the connection after any error
//       console.log('Broker reported error: ' + frame.headers['message']);
//       console.log('Additional details: ' + frame.body);
//     };

//     clientdata.activate(); // 클라이언트 활성화
//     changeClient(clientdata); // 클라이언트 갱신
//   } catch (err) {
//     console.log(err);
//   }
// };

// const disConnect = () => {
//   if (client) {
//     client.deactivate();
//   }
// };

// const callback = function (message) {
//   console.log(message);
//   if (message.body) {
//     // let msg = JSON.parse(message.body);
//     // setChatList(chats => [...chats, msg]);
//   }
// };

// const sendChat = () => {
//   // if (chat === '' || !userId) {
//   //   return;
//   // }

//   if (chat === '') {
//     return;
//   }

//   try {
//     // console.log('-----client----', client);
//     client.publish({
//       // destination: '/pub/chat/' + chatroomId,
//       // destination: '/queue/jin',
//       // destination: '/queue/test_queue',
//       // destination: '/queue/test_queue',
//       destination: '/exchange/my_exchange/test_key',

//       // destination: '/topic/user.1.#',
//       // body: JSON.stringify({
//       //   type: '',
//       //   sender: userId,
//       //   channelId: '1',
//       //   data: chat,
//       // }),
//       body: 'Hello world',
//       skipContentLengthHeader: true,
//     });
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }

//   setChat('');
// };

// useEffect(() => {
//   connect();
// }, []);
