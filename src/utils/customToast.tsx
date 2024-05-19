import Toast, {ToastConfig} from 'react-native-toast-message';
import {View} from 'react-native';
import {Text} from '@/components';

export const toastConfig: ToastConfig = {
  customToast: ({text1}) => (
    <View className="rounded-full bg-gray-950 px-4 py-2 opacity-80">
      <Text className="text-white">{text1}</Text>
    </View>
  ),
};

export const showToast = (text: string) => {
  Toast.show({
    type: 'customToast',
    text1: text,
    position: 'bottom',
    visibilityTime: 2000,
    swipeable: true,
  });
};
