import {useState} from 'react';
import {View} from 'react-native';
import {CheckBox, Button, Text, TitleSection} from '@/components';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import {AuthScreenProps, AuthScreen} from '@/types/navigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle} from '@/theme';

export interface IsChecked {
  [key: string]: boolean;
  ToU: boolean;
  personalInfor: boolean;
  marketing: boolean;
}

const TERMS_DATA = [
  {
    isRequired: `(필수)${' '}`,
    label: '서비스 이용약관',
    objName: 'ToU',
  },
  {
    isRequired: `(필수)${' '}`,
    label: '개인정보처리방침',
    objName: 'personalInfor',
  },
  {
    isRequired: `(선택)${' '}`,
    label: '마케팅 정보 활용',
    objName: 'marketing',
  },
];

const Terms = ({navigation}: AuthScreenProps<AuthScreen.TERMS>) => {
  const [isChecked, setIsChecked] = useState<IsChecked>({
    ToU: false,
    personalInfor: false,
    marketing: false,
  });

  const handlePress = (checkedItem: string) => {
    setIsChecked(prev => {
      const updatedValues = {...prev};

      if (checkedItem === 'all') {
        const newValue = !(prev.ToU && prev.personalInfor && prev.marketing);
        updatedValues.ToU = newValue;
        updatedValues.personalInfor = newValue;
        updatedValues.marketing = newValue;
      } else {
        updatedValues[checkedItem] = !prev[checkedItem];
      }

      return updatedValues;
    });
  };

  return (
    <View className={`${containerStyle('detail')} justify-between`}>
      <View>
        <TitleSection
          title="이용약관에 동의해주세요."
          body={
            '우리들만의 리그를 이용하기 전 서비스\n이용 동의 및 확인이 필요합니다.'
          }
        />
        <View>
          <Button
            type="filled"
            variant="custom"
            className="mb-3 items-start justify-start bg-gray-50 dark:bg-gray-950"
            onPress={() => handlePress('all')}>
            <CheckBox checked={isChecked.ToU && isChecked.personalInfor} />
            <Text className="ml-3" color="text-gray-900 dark:text-white">
              약관 모두 동의하기
            </Text>
          </Button>

          {TERMS_DATA.map(({isRequired, label, objName}) => (
            <Button
              type="text"
              variant="custom"
              className="flex-row items-center justify-between px-5 py-1"
              onPress={() => handlePress(objName)}
              key={objName}>
              <View className="flex-row items-center">
                <CheckBox type="solid" checked={isChecked[objName]} />
                <Text
                  className="ml-3"
                  color="text-gray-700 dark:text-gray-100"
                  type="caption">
                  {isRequired}
                </Text>
                <Text
                  color="text-gray-700 dark:text-gray-100"
                  type="caption"
                  weight="bold">
                  {label}
                </Text>
                <Text color="text-gray-700 dark:text-gray-100" type="caption">
                  에 동의합니다.
                </Text>
              </View>
              <ArrowRightIcon color="#B6B8BA" width={16} height={16} />
            </Button>
          ))}
        </View>
      </View>

      <SafeAreaView>
        <Button
          label="다음"
          onPress={() =>
            navigation.navigate(AuthScreen.EMAIL_CHECK, {
              type: 'register',
            })
          }
          disabled={isChecked.ToU && isChecked.personalInfor ? false : true}
        />
      </SafeAreaView>
    </View>
  );
};

export default Terms;
