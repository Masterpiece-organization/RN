import {View} from 'react-native';
import {Button, TitleSection} from '@components/index';
import {useState} from 'react';
import {containerStyle} from '@/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MatchPostScreens, MatchPostScreenProps} from '@/types/navigationTypes';

const items = [
  {label: '자체경기', className: 'mb-2'},
  {
    label: '일반경기',
    className: '',
  },
];

const MatchTypeSelection = ({
  navigation,
}: MatchPostScreenProps<MatchPostScreens.MATCH_TYPE_SELECTION>) => {
  const [selectedType, setSelectedType] = useState('');

  const handleSelectType = (type: string) => {
    if (selectedType === type) {
      setSelectedType('');
    } else {
      setSelectedType(type);
    }
  };

  return (
    <View className={containerStyle('detail')}>
      <View className="flex-1">
        <TitleSection
          title="어떤 경기를 원하시나요?"
          body="원하시는 경기 유형을 선택해주세요."
        />
        {items.map(({label, className}) => (
          <Button
            type="outlined"
            onPress={() => handleSelectType(label)}
            labelColor={`text-gray-200 ${
              selectedType === label && 'text-primary'
            }`}
            label={label}
            className={`${className} ${
              selectedType === label && 'border-primary'
            }`}
            key={label}
          />
        ))}
      </View>

      <SafeAreaView>
        <Button
          label="다음"
          onPress={() =>
            navigation.navigate(MatchPostScreens.MATCH_DATE_SELECTION)
          }
          disabled={!selectedType}
        />
      </SafeAreaView>
    </View>
  );
};

export default MatchTypeSelection;
