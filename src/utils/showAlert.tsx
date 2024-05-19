import {Alert} from 'react-native';

type ButtonProps = {
  text: string;
  onPress?: () => void;
};
interface AlertProps {
  title: string;
  message: string;
  buttons: ButtonProps[];
}

export default function showAlert({title, message, buttons}: AlertProps) {
  Alert.alert(title, message, buttons);
}
