import {useState} from 'react';
import {Button, Text, Wrap} from '@components/index';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {CheckBox} from '@/components/index';
import {useMainContext} from '@/context/MainContext';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';

const TERMS_DATA = [
  {
    label: '이용약관(필수)',
    objName: 'ToU',
    className: 'p-4',
  },
  {
    label: '개인정보 수집 이용•동의(필수)',
    objName: 'personalInfor',
    className: 'pb-4 px-4',
  },
];

interface IisChecked {
  [key: string]: boolean;
  ToU: boolean;
  personalInfor: boolean;
}

export type TermsScreenProps = StackScreenProps<RootStackParamList, 'Terms'>;

const Terms = ({navigation}: TermsScreenProps) => {
  const contexts = useMainContext();

  const [isChecked, setIsChecked] = useState<IisChecked>({
    ToU: false,
    personalInfor: false,
  });

  const handlePress = (checkedItem: string) => {
    setIsChecked(prev => {
      const updatedValues = {...prev};

      if (checkedItem === 'all') {
        const newValue = !(prev.ToU && prev.personalInfor);
        updatedValues.ToU = newValue;
        updatedValues.personalInfor = newValue;
      } else {
        updatedValues[checkedItem] = !prev[checkedItem];
      }

      return updatedValues;
    });
  };

  const handleSubmit = () => {
    const {ToU, personalInfor} = isChecked;

    if (ToU && personalInfor) {
      return navigation.navigate('Register');
    }
    createAlert();
  };

  const createAlert = () => {
    Alert.alert(
      '이용 약관 및 개인정보 처리방침',
      '회원가입을 위해서는 이용약관 및 개인정보 처리방침에 동의가 필요합니다.',
      [{text: '확인', onPress: () => console.log('OK Pressed')}],
    );
  };

  return (
    <SafeAreaView className="dark:bg-black">
      <SafeAreaView className="flex">
        <View className="justify-center px-8 pt-8 ">
          <Text className="mb-2" type="subtitle">
            이용약관에 동의해주세요.
          </Text>
          <Text
            textColor={
              contexts?.colorScheme === 'dark'
                ? 'text-white'
                : 'text-neutral-600'
            }>
            우리들만의 리그를 이용하기 전 이용약관 동의가 필요합니다.
          </Text>
        </View>
      </SafeAreaView>
      <Wrap border={true} classStyle="m-8">
        <View
          className={`p-4 border-b ${
            contexts?.colorScheme === 'dark'
              ? 'border-neutral-700'
              : 'border-neutral-300'
          }`}>
          <TouchableWithoutFeedback onPress={() => handlePress('all')}>
            <View className="flex-row items-center">
              <CheckBox checked={isChecked.ToU && isChecked.personalInfor} />
              <Text className="font-bold ml-2">모두 동의</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {TERMS_DATA.map(({label, objName, className}) => (
          <View className={className}>
            <TouchableWithoutFeedback
              className="flex-row items-center"
              onPress={() => handlePress(objName)}>
              <View className="flex-row items-center">
                <CheckBox checked={isChecked[objName]} />
                <Text className="ml-2" type="bodySmall">
                  {label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ))}
      </Wrap>
      <View className="pb-8 px-8">
        <Button
          label="다음"
          onPress={handleSubmit}
          textColor="text-white"
          buttonColor={
            contexts?.colorScheme === 'dark' ? 'bg-neutral-700' : 'bg-black'
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Terms;
