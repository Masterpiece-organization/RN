import {Text, TitleSection, Button} from '@/components';
import {View} from 'react-native';
import {StyledRightIcon} from '@/constants/icons';
import {SettingScreenProps, SettingScreens} from '@/types/navigationTypes';

const Faq = ({navigation}: SettingScreenProps<SettingScreen.FAQ>) => {
  return (
    <View className="flex-1">
      <TitleSection
        title="궁금한 사항이 있으신가요?"
        body={'서비스 이용 과정에서 생긴 궁금한 점,\n여기에서 찾아보세요!'}
        className="px-5 pt-4"
      />
      <View className="-my-4 flex-1 px-2">
        <Button
          type="text"
          variant="custom"
          className="flex-row items-center justify-between rounded-lg px-3 py-4 active:scale-[.97] active:bg-gray-100 dark:active:bg-gray-950"
          onPress={() =>
            navigation.navigate(SettingScreen.FAQ_DETAIL, {id: 0})
          }>
          <View className="flex-row items-center">
            <Text
              type="display"
              className="mb-[1px] mr-2 text-base"
              color="text-primary">
              Q
            </Text>
            <Text color="text-gray-800 dark:text-white">
              우리들만의 리그는 무엇인가요?
            </Text>
          </View>

          <StyledRightIcon width={16} height={16} className="color-gray-200" />
        </Button>
      </View>
    </View>
  );
};

export default Faq;
