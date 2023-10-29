import {
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ContainerType} from './Container.types';

const Container = ({
  scroll = false,
  header = true,
  horizontal = false,
  className,
  children,
}: ContainerType) => {
  if (horizontal) {
    return (
      <SafeAreaView
        className={`${header ? 'mt-xl' : 'mt-xxl'} flex-1 ${className}`}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {scroll ? (
        <ScrollView contentContainerStyle={{paddingBottom: 50}}>
          <SafeAreaView
            className={`${header ? 'mt-xl' : 'mt-xxl'} flex-1 ${className}`}>
            {children}
          </SafeAreaView>
        </ScrollView>
      ) : (
        <SafeAreaView
          className={`${header ? 'mt-xl' : 'mt-xxl'} flex-1 ${className}`}>
          {children}
        </SafeAreaView>
      )}
    </TouchableWithoutFeedback>
  );
};
// mx-5
export default Container;
