import {
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ContainerType} from './Container.types';

const Container = ({scroll = false, children}: ContainerType) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {scroll ? (
        <ScrollView contentContainerStyle={{paddingBottom: 50}}>
          <SafeAreaView className="flex-1 mx-5">{children}</SafeAreaView>
        </ScrollView>
      ) : (
        <SafeAreaView className="flex-1 mx-5">{children}</SafeAreaView>
      )}
    </TouchableWithoutFeedback>
  );
};

export default Container;
