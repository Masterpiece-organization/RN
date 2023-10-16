import {
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ContainerType} from './Container.types';

const Container = ({
  scroll = false,
  horizontal = false,
  className,
  children,
}: ContainerType) => {
  if (horizontal)
    return (
      <SafeAreaView className={`${className} mt-xl flex-1`}>
        {children}
      </SafeAreaView>
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {scroll ? (
        <ScrollView contentContainerStyle={{paddingBottom: 50}}>
          <SafeAreaView className={`${className} mt-xl flex-1`}>
            {children}
          </SafeAreaView>
        </ScrollView>
      ) : (
        <SafeAreaView className={`${className} mt-xl flex-1`}>
          {children}
        </SafeAreaView>
      )}
    </TouchableWithoutFeedback>
  );
};
// mx-5
export default Container;
