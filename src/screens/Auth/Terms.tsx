import {useState, useCallback} from 'react';
import {Button, Text, TitleSection} from '@components/index';
import {View, TouchableWithoutFeedback} from 'react-native';
import {CheckBox, Container} from '@/components';
import {useMainContext} from '@/contexts/MainContext';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import {colorBasedOnTheme, defaultMargin} from '@/theme';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import {useFocusEffect} from '@react-navigation/native';

const TERMS_DATA = [
  {
    label: '이용약관(필수)',
    objName: 'ToU',
    className: 'py-sm px-5',
  },
  {
    label: '개인정보 수집 이용 동의(필수)',
    objName: 'personalInfor',
    className: 'pb-sm px-5',
  },
  {
    label: '마케팅 이메일 수신 동의(선택)',
    objName: 'marketing',
    className: 'pb-sm px-5',
  },
];

interface IisChecked {
  [key: string]: boolean;
  ToU: boolean;
  personalInfor: boolean;
  marketing: boolean;
}

type ErrorState = {
  [key: string]: boolean;
  ToU: boolean;
  personalInfor: boolean;
};

export type TermsScreenProps = StackScreenProps<RootStackParamList, 'Terms'>;

const Terms = ({navigation}: TermsScreenProps) => {
  const contexts = useMainContext();
  const colorScheme = contexts?.colorScheme;

  const colorThemes = useCallback(() => {
    const borderStyle = colorBasedOnTheme(
      colorScheme,
      'border-gray-600',
      'border-gray-600',
    );

    const textStyle = colorBasedOnTheme(
      colorScheme,
      'text-white',
      'text-gray-800',
    );

    const iconStyle = colorBasedOnTheme(colorScheme, '#fff', '#404040');

    return {borderStyle, textStyle, iconStyle};
  }, [colorScheme]);

  const {borderStyle, textStyle, iconStyle} = colorThemes();

  const [isChecked, setIsChecked] = useState<IisChecked>({
    ToU: false,
    personalInfor: false,
    marketing: false,
  });

  const [error, setError] = useState<ErrorState>({
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
      return navigation.navigate('CheckEmail');
    }

    setError({
      ToU: !ToU,
      personalInfor: !personalInfor,
    });
  };

  useFocusEffect(
    useCallback(() => {
      setError({
        ToU: false,
        personalInfor: false,
      });

      setIsChecked({
        ToU: false,
        personalInfor: false,
        marketing: false,
      });

      return () => {};
    }, []),
  );

  return (
    <Container className={`${defaultMargin} justify-between`}>
      <View>
        <TitleSection
          title="이용약관에 동의해주세요."
          body={`우리들만의 리그를 이용하기 전 서비스\n이용 동의 및 확인이 필요합니다.`}
        />

        <View className={`rounded-lg border ${borderStyle}`}>
          <View className={`mx-5 border-b py-sm ${borderStyle}`}>
            <TouchableWithoutFeedback onPress={() => handlePress('all')}>
              <View className="flex-row items-center">
                <CheckBox checked={isChecked.ToU && isChecked.personalInfor} />
                <Text className="ml-xs" textColor={textStyle}>
                  모두 동의
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {TERMS_DATA.map(({label, objName, className}, index) => (
            <View className={className} key={label}>
              <TouchableWithoutFeedback
                className="flex-row items-center"
                onPress={() => handlePress(objName)}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <CheckBox
                      checked={isChecked[objName]}
                      error={error[objName]}
                    />
                    <Text
                      className="ml-xs"
                      textColor={
                        index !== 2 && error[objName]
                          ? 'text-dark-red'
                          : textStyle
                      }>
                      {label}
                    </Text>
                  </View>

                  <ArrowRightIcon color={iconStyle} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))}
        </View>
        <Text type="bodySmall" textColor="text-dark-red" className="mt-xs">
          {(error.ToU || error.personalInfor) &&
            '필수 이용약관에 동의해주세요.'}
        </Text>
      </View>

      <View className="pb-lg">
        <Button label="다음" onPress={handleSubmit} textColor="text-white" />
      </View>
    </Container>
  );
};

export default Terms;
