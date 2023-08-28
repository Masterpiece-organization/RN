import {TouchableWithoutFeedback, Keyboard, SafeAreaView} from 'react-native';
import {ContainerType} from './Container.types';

const Container = ({children}: ContainerType) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 mx-5">{children}</SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Container;
