import {View} from 'react-native';
import {Text, Card, Button} from '@/components';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import {useMainContext} from '@/contexts/MainContext';
import {colorBasedOnTheme} from '@/theme';

const Setting = () => {
  const contexts = useMainContext();
  const colorScheme = contexts?.colorScheme;
  const fillColor = colorBasedOnTheme(colorScheme, 'white', '#121212');

  const onPress = () => {
    console.log('test');
  };

  return (
    <View>
      <Card title="프로필 설정">
        <View className={`px-5`}>
          <Button
            label="닉네임 설정"
            buttonColor=""
            textColor=""
            onPress={onPress}
            buttonWrap="justify-between flex-1"
            icon={<ArrowRightIcon color={fillColor} />}
          />
        </View>
        <View className={`px-5`}>
          <Button
            label="포지션 수정"
            buttonColor=""
            textColor=""
            className="mt-2 h-6"
            onPress={onPress}
            buttonWrap="justify-between flex-1"
            icon={<ArrowRightIcon color={fillColor} />}
          />
        </View>
      </Card>
      <Card title="알림 설정">
        <View className={`px-5`}>
          <Button
            label="푸시알림 설정"
            buttonColor=""
            textColor=""
            onPress={onPress}
            buttonWrap="justify-between flex-1"
            icon={<ArrowRightIcon color={fillColor} />}
          />
        </View>
        <View className={`px-5`}>
          <Button
            label="방해금지 시간 설정 (보류)"
            buttonColor=""
            textColor=""
            className="mt-2 h-6"
            onPress={onPress}
            buttonWrap="justify-between flex-1"
            icon={<ArrowRightIcon color={fillColor} />}
          />
        </View>
      </Card>

      <Card title="기타">
        <View className={`px-5`}>
          <Button
            label="로그아웃"
            buttonColor=""
            textColor=""
            className="mt-3 h-6"
            onPress={contexts?.logout || (() => {})}
            buttonWrap="justify-between flex-1"
          />
        </View>
      </Card>
    </View>
  );
};

export default Setting;
