import {View, Switch} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainRootStackParamList} from '@/typings/RootStackParamList';
import {Card, Button, Text, RadioButton} from '@/components';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import {useState} from 'react';
import {useMainContext} from '@/contexts/MainContext';
import {defaultMargin} from '@/theme';
import useTheme from '@/hooks/useTheme';

type Item = {
  label: string;
  icon?: React.ReactNode; // ReactNode 타입은 JSX 요소를 포함할 수 있습니다.
  onPress?: () => void;
};

type DataTypes = {
  [key: string]: {
    title: string;
    items: Item[];
  };
};

interface ComponentProps {
  item: Item[];
  isEnabled?: boolean;
}

type optionTypes = 'light' | 'dark' | 'system';

type ProfileScreenProps = StackScreenProps<
  MainRootStackParamList,
  'SettingDetail'
>;

type SectionComponents = {
  [key: string]: JSX.Element;
};

const ThemeSection = ({item}: ComponentProps) => {
  return (
    <Card title="테마 설정" className="space-x-5 space-y-4 pb-sm">
      {item.map(({label, icon, onPress}: Item) => (
        <View className="mr-sm">
          <Button
            type="text"
            label={label}
            buttonColor=""
            textColor=""
            onPress={onPress}
            buttonWrap="justify-between"
            icon={icon}
            textFont="font-bodyRegular"
          />
        </View>
      ))}
    </Card>
  );
};

const NotificationSection = ({item, isEnabled}: ComponentProps) => {
  return (
    <Card title="알림설정" className="space-x-5 space-y-4 pb-sm">
      {item.map(({label, onPress}: Item) => (
        <View className="mr-sm flex-row items-center justify-between">
          <Text>{label}</Text>
          <Switch
            trackColor={{false: '#e4e4e4', true: '#D7C6F5'}}
            thumbColor={isEnabled ? '#9866f4' : '#fff'}
            ios_backgroundColor="#e4e4e4"
            onValueChange={onPress}
            value={isEnabled}
          />
        </View>
      ))}
    </Card>
  );
};

const TermsSection = ({item}: ComponentProps) => {
  return (
    <Card title="사용자 정보" className="space-x-5 space-y-4 pb-sm">
      {item.map(({label, icon, onPress}: Item) => (
        <View className="mr-sm">
          <Button
            type="text"
            label={label}
            buttonColor=""
            textColor=""
            onPress={onPress}
            buttonWrap="justify-between"
            icon={icon}
            textFont="font-bodyRegular"
          />
        </View>
      ))}
    </Card>
  );
};

const SettingDetail = ({route}: ProfileScreenProps) => {
  const {themeMode, setMode} = useMainContext();
  const {colorHexTheme} = useTheme();
  const {iconBlackHex} = colorHexTheme();

  const {
    params: {page},
  } = route;

  // TODO 기능구현해야함
  const [selectedOption, setSelectedOption] = useState<optionTypes>(themeMode);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const DATA: DataTypes = {
    theme: {
      title: '테마설정',
      items: [
        {
          label: '라이트 모드',
          icon: (
            <RadioButton
              selected={selectedOption === 'light'}
              onPress={() => {
                setMode('light');
                setSelectedOption('light');
              }}
            />
          ),
          onPress: () => {
            setMode('light');
            setSelectedOption('light');
          },
        },
        {
          label: '다크모드',
          icon: (
            <RadioButton
              selected={selectedOption === 'dark'}
              onPress={() => {
                setMode('dark');
                setSelectedOption('dark');
              }}
            />
          ),
          onPress: () => {
            setMode('dark');
            setSelectedOption('dark');
          },
        },
        {
          label: '시스템 설정 사용',
          icon: (
            <RadioButton
              selected={selectedOption === 'system'}
              onPress={() => {
                setMode('system');
                setSelectedOption('system');
              }}
            />
          ),
          onPress: () => {
            setMode('system');
            setSelectedOption('system');
          },
        },
      ],
    },
    notification: {
      title: '알림설정',
      items: [
        {
          label: '매치알림 설정',

          onPress: () => toggleSwitch(),
        },
        {
          label: '클럽알림 설정',

          onPress: () => toggleSwitch(),
        },
      ],
    },
    terms: {
      title: '사용자 정보',
      items: [
        {
          label: '개인정보처리방침',
          icon: <ArrowRightIcon width={16} color={iconBlackHex} />,
          onPress: console.log,
        },
        {
          label: '탈퇴하기',
          icon: <ArrowRightIcon width={16} color={iconBlackHex} />,
          onPress: console.log,
        },
      ],
    },
  };

  const item = DATA[page].items;

  const sectionComponents: SectionComponents = {
    theme: <ThemeSection item={item} />,
    notification: <NotificationSection item={item} isEnabled={isEnabled} />,
    terms: <TermsSection item={item} />,
  };

  // 현재 페이지에 해당하는 컴포넌트 가져오기
  const CurrentSection = sectionComponents[page];

  return <View className={`${defaultMargin} mt-base`}>{CurrentSection}</View>;
};

export default SettingDetail;
