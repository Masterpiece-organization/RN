import {useState} from 'react';
import {View, Switch} from 'react-native';
import {Card, Button} from '@/components';
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
      icon: <ArrowRightIcon color={fillColor} />,
      onPress,
      className: '',
    },
    {
      label: '문의하기',
      icon: <ArrowRightIcon color={fillColor} />,
      onPress,
      className: '',
    },
    {
      label: '이용약관',
      icon: <ArrowRightIcon color={fillColor} />,
      onPress,
      className: '',
    },
    {
      label: '개인정보 처리방침',
      icon: <ArrowRightIcon color={fillColor} />,
      onPress,
      className: '',
    },
    {
      label: '버전정보',
      icon: <ArrowRightIcon color={fillColor} />,
      onPress,
      className: 'mt-2 h-6',
    },
  ];

  return (
    <View className={`${defaultMargin}`}>
      <Card title="알림 설정" className="rounded-lg">
        <View className="-mr-1 px-5">
          <Button
            label="푸시알림 설정"
            buttonColor=""
            textColor=""
            onPress={onPress}
            buttonWrap="justify-between flex-1"
            icon={<ArrowRightIcon color={fillColor} />}
          />
        </View>
        <View className="px-5">
          <Button
            label="방해금지 시간 설정 (보류)"
            buttonColor=""
            textColor=""
            className="mt-2 h-6"
            onPress={onPress}
            buttonWrap="justify-between flex-1"
            icon={
              <Switch
                trackColor={{false: '#767577', true: '#d4d4d4'}}
                thumbColor={isEnabled ? '#121212' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            }
          />
        </View>
      </Card>

      <Card title="기타" className="rounded-lg">
        {SETTING_DATA.map(({label, onPress, icon, className}) => {
          return (
            <View className="-mr-1 px-5">
              <Button
                label={label}
                buttonColor=""
                textColor=""
                className={className}
                onPress={onPress}
                buttonWrap="justify-between flex-1"
                icon={icon}
              />
            </View>
          );
        })}
      </Card>
      <View className={`${elementBackgroundStyle} mt-4 rounded-lg px-5`}>
        <Button
          label="로그아웃"
          buttonColor=""
          textColor=""
          onPress={logOut || (() => {})}
          buttonWrap="justify-between flex-1"
        />
      </View>
    </View>
  );
};

export default Setting;
