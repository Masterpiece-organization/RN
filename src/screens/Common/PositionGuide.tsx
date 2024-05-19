import {View, ScrollView} from 'react-native';
import {Text, TitleSection} from '@/components';
import {containerStyle} from '@/theme';
import {REFERENCE_DATA} from '@/constants';

const labelColorMap: Record<string, string> = {
  공격수: 'text-red',
  미드필더: 'text-green',
  수비수: 'text-primary',
  골키퍼: 'text-yellow',
};

const PositionGuide = () => {
  return (
    <ScrollView>
      <View className={`${containerStyle('detail')} pb-20`}>
        <TitleSection
          title="나에게 딱 맞는 나만의 포지션을 찾아보세요."
          className="mb-4"
        />
        <View>
          {REFERENCE_DATA.POSITION_GUIDE.map(({label, positions}, i) => {
            const lastIndex = REFERENCE_DATA.POSITION_GUIDE.length - 1;

            return (
              <View key={label}>
                <Text type="title" className="mb-2">
                  {label}
                </Text>
                <View
                  className={`rounded-lg bg-gray-50 p-5 dark:bg-gray-950 ${
                    lastIndex === i ? '' : 'mb-5'
                  }`}>
                  {positions.map(({position, body}, _i) => {
                    const lastPositionIndex = positions.length - 1;

                    return (
                      <View
                        key={position}
                        className={`${lastPositionIndex === _i ? '' : 'mb-3'}`}>
                        <Text
                          weight="bold"
                          color={labelColorMap[label]}
                          className="mb-1">
                          {position}
                        </Text>
                        <Text color="text-gray-800 dark:text-white">
                          {body}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default PositionGuide;
