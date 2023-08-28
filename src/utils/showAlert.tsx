import {Alert} from 'react-native';

interface AlertProps {
  title: string;
  message: string;
  onPress: () => void;
}

export default function showAlert({title, message, onPress}: AlertProps) {
  Alert.alert(title, message, [{text: '확인', onPress: onPress}]);
}
