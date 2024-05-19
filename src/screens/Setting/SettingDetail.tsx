import {useState} from 'react';
import {View, Switch, Appearance} from 'react-native';
import {SettingScreenProps, SettingScreens} from '@/types/navigationTypes';
import {
  Card,
  Button,
  BottomSheet,
  BottomSheetContent,
  Text,
  CheckBox,
} from '@/components';
import {useThemeStore} from '@/stores/store';
import {containerStyle, cardBackground} from '@/theme';
import {StyledRightIcon} from '@/constants/icons';
import {useBottomSheetStore} from '@/stores/store';
import useBottomSheet from '@/hooks/useBottomSheet';

type Item = {
  label: string;
  theme?: optionTypes;
};

type DataTypes = {
  [key: string]: {
    title: string;
    items: Item[];
  };
};

export type optionTypes = 'light' | 'dark' | null;

type SectionComponents = {
  [key: string]: JSX.Element;
};

interface ThemeProps {
  item: Item[];
}

interface NotificationProps {
  item: Item[];
  isEnabled: boolean;
  onPress: () => void;
}

interface TermsProps {
  item: Item[];
  handlePresentModalPress: () => void;
}

const DATA: DataTypes = {
  theme: {
    title: '테마설정',
    items: [
      {
        label: '라이트 모드',
        theme: 'light',
      },
      {
        label: '다크모드',
        theme: 'dark',
      },
      {
        label: '시스템 설정 사용',
        theme: null,
      },
    ],
  },
  notification: {
    title: '알림설정',
    items: [
      {
        label: '알림 설정',
      },
    ],
  },
  terms: {
    title: '사용자 정보',
    items: [
      {
        label: '개인정보처리방침',
      },
      {
        label: '탈퇴하기',
      },
    ],
  },
};

const ThemeSection = ({item}: ThemeProps) => {
  const {currentTheme, setCurrentTheme} = useThemeStore();

  return (
    <Card size="medium" className="mb-3">
      <View className="mb-4 flex-row justify-between">
        <Text type="title">테마설정</Text>
      </View>
      {item.map(({label, theme}, i) => {
        const lastItem = item.length - 1;
        return (
          <Button
            type="text"
            variant="custom"
            className={`${
              lastItem === i ? '' : 'mb-4'
            } flex-row items-center justify-between`}
            onPress={() => {
              setCurrentTheme(theme ?? null);
              Appearance.setColorScheme(theme);
            }}
            key={theme}>
            <Text>{label}</Text>
            <View className="h-[23px]">
              {currentTheme === theme && (
                <CheckBox type="solid" checked={currentTheme === theme} />
              )}
            </View>
          </Button>
        );
      })}
    </Card>
  );
};

const NotificationSection = ({item, isEnabled, onPress}: NotificationProps) => {
  return (
    <Card size="medium" className="mb-3">
      <View className="mb-4 flex-row justify-between">
        <Text type="title">알림설정</Text>
      </View>
      <View className={'flex-row items-center justify-between'}>
        <Text>{item[0].label}</Text>
        <Switch
          trackColor={{false: '#F2F4F6', true: '#D7EBFF'}}
          thumbColor={isEnabled ? '#4C9AEC' : '#fff'}
          ios_backgroundColor="#F2F4F6"
          onValueChange={onPress}
          value={isEnabled}
        />
      </View>
    </Card>
  );
};

const TermsSection = ({item, handlePresentModalPress}: TermsProps) => {
  return (
    <Card size="medium" className="mb-3">
      <View className="mb-4 flex-row justify-between">
        <Text type="title">사용자 정보</Text>
      </View>
      {item.map(({label}: Item, i) => {
        const lastItem = item.length - 1;
        return (
          <Button
            type="text"
            variant="custom"
            className={`${
              lastItem === i ? '' : 'mb-4'
            } flex-row items-center justify-between`}
            onPress={
              label === '탈퇴하기' ? handlePresentModalPress : console.log
            }
            key={label}>
            <Text>{label}</Text>
            <StyledRightIcon
              width={16}
              height={16}
              className="color-gray-200"
            />
          </Button>
        );
      })}
    </Card>
  );
};

const SettingDetail = ({route}: SettingScreenProps<SettingScreens>) => {
  const {
    params: {type},
  } = route;

  const {bottomSheetRef, open} = useBottomSheet();

  // TODO 기능구현해야함
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const item = DATA[type].items;

  const sectionComponents: SectionComponents = {
    theme: <ThemeSection item={item} />,
    notification: (
      <NotificationSection
        item={item}
        isEnabled={isEnabled}
        onPress={toggleSwitch}
      />
    ),
    terms: <TermsSection item={item} handlePresentModalPress={open} />,
  };

  // 현재 페이지에 해당하는 컴포넌트 가져오기
  const CurrentSection = sectionComponents[type];

  return (
    <>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent>
          <Text type="display" className="mb-5 px-5 text-xl">
            정말 탈퇴하시겠습니까?
          </Text>
          <Text className="mx-5 mb-5" color="text-gray-700 dark:text-white">
            지금 탈퇴하시면 더 이상 클럽활동과 게임 매치를 이용할 수 없습니다.
          </Text>

          <View className="mx-5 mb-6 rounded-lg bg-gray-50 px-5 py-4 dark:bg-gray-950">
            <Text type="caption" weight="bold" className="mb-2">
              탈퇴하기 전에 확인해주세요.
            </Text>
            <View>
              <View className="flex-row items-start">
                <Text
                  type="caption"
                  color="text-gray-700 dark:text-gray-100"
                  className="mb-2">
                  • 우리들만의 리그에서 관리했던 모든 개인정보를 다시 볼 수
                  없어요.
                </Text>
              </View>

              <Text
                type="caption"
                color="text-gray-700 dark:text-gray-100"
                className="mb-2">
                • 나의 프로필과 게시글이 삭제 되고 회원님의 클럽에서의 멋진
                활동이 사라집니다.
              </Text>
              <Text
                type="caption"
                color="text-gray-700 dark:text-gray-100"
                className="mb-5">
                • 채팅메세지의 기록은 다른사람에게 계속 표시될 수 있습니다.
              </Text>
            </View>
            <View className="flex-row">
              <CheckBox />
              <Text
                weight="bold"
                className="ml-2 w-full text-[15px]"
                numberOfLines={2}>
                모든 내용을 인지하였으며, 탈퇴를 진행합니다.
              </Text>
            </View>
          </View>
          <View>
            <Button label="탈퇴하기" float className="mx-5" />
          </View>
        </BottomSheetContent>
      </BottomSheet>
      <View className={`${containerStyle('card')} ${cardBackground}`}>
        {CurrentSection}
      </View>
    </>
  );
};

export default SettingDetail;
