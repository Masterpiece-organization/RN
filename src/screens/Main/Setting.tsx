import {useState} from 'react';
import {View, Switch} from 'react-native';
import {Card, Button, Text} from '@/components';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import {useMainContext} from '@/contexts/MainContext';
import {
  colorBasedOnTheme,
  defaultMargin,
  elementBackgroundStyle,
} from '@/theme';

const Setting = () => {
  const contexts = useMainContext();
  const colorScheme = contexts?.colorScheme;
  const fillColor = colorBasedOnTheme(colorScheme, 'white', '#121212');
  const logOut = contexts?.logout;

  const onPress = () => {
    console.log('test');
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const SETTING_DATA = [
    {
      label: '자주 묻는 질문',
      icon: <ArrowRightIcon width={16} color={fillColor} />,
      onPress,
    },
    {
      label: '문의하기',
      icon: <ArrowRightIcon width={16} color={fillColor} />,
      onPress,
    },
    {
      label: '이용약관',
      icon: <ArrowRightIcon width={16} color={fillColor} />,
      onPress,
    },
    {
      label: '개인정보 처리방침',
      icon: <ArrowRightIcon width={16} color={fillColor} />,
      onPress,
    },
    {
      label: '테마',
      icon: <ArrowRightIcon width={16} color={fillColor} />,
      onPress,
    },
    {
      label: '버전정보',
      icon: null,
      onPress,
    },
  ];

  return (
    <View className={`${defaultMargin} mt-base`}>
      <Card title="알림 설정" className="mb-xs space-x-5 space-y-4">
        <View className="mr-sm">
          <Button
            type="text"
            label="푸시알림 설정"
            buttonColor=""
            textColor=""
            onPress={onPress}
            buttonWrap="justify-between"
            icon={<ArrowRightIcon width={16} color={fillColor} />}
          />
        </View>
        <View className="mr-sm pb-sm">
          <Button
            type="text"
            label="방해금지 시간 설정 (보류)"
            buttonColor=""
            textColor=""
            onPress={onPress}
            buttonWrap="justify-between"
            icon={<ArrowRightIcon width={16} color={fillColor} />}
            // icon={
            //   <Switch
            //     trackColor={{false: '#767577', true: '#d4d4d4'}}
            //     thumbColor={isEnabled ? '#121212' : '#f4f3f4'}
            //     ios_backgroundColor="#3e3e3e"
            //     onValueChange={toggleSwitch}
            //     value={isEnabled}
            //   />
            // }
          />
        </View>
      </Card>

      <Card title="기타" className="mb-xs space-x-5 space-y-4">
        {SETTING_DATA.map(({label, onPress, icon}, index) => {
          const isLastItem = index === SETTING_DATA.length - 1;

          return (
            <View
              className={`mr-sm ${
                isLastItem ? 'flex-row justify-between pb-sm' : ''
              }`}>
              <Button
                type="text"
                label={label}
                buttonColor=""
                textColor=""
                onPress={onPress}
                buttonWrap="justify-between"
                icon={icon}
              />
              {isLastItem && <Text className="mr-1">v0.1.0</Text>}
            </View>
          );
        })}
      </Card>
      <Card>
        <View className="mx-sm py-sm">
          <Button
            type="text"
            label="로그아웃"
            buttonColor=""
            textColor="text-dark-red"
            onPress={logOut || (() => {})}
            buttonWrap="justify-between"
          />
        </View>
      </Card>
    </View>
  );
};

export default Setting;
