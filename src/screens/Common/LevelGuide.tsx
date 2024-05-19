import {View, ScrollView} from 'react-native';
import {Text, TitleSection, Container} from '@/components';
import {REFERENCE_DATA} from '@/constants';

const LevelGuide = () => {
  return (
    <ScrollView>
      <Container>
        <TitleSection
          title="나의 축구 레벨, 올바른 단계를 찾아보세요."
          className="mb-4"
        />
        <View className="mb-5">
          <Text type="title" className="mb-2">
            레벨이란?
          </Text>
          <Text color="text-gray-800 dark:text-white">
            레벨이란 여러분의 현재 축구 실력을 나타내는 척도입니다. 우리들만의
            리그에서는 이 레벨을 기반으로 여러분에게 가장 적합한 정보를
            제공하려고 합니다. 자신이 어느 레벨에 속하는지 확인한 후, 그에 맞는
            레벨을 선택해 주세요.
          </Text>
        </View>
        <View className="rounded-lg bg-gray-50 p-5 dark:bg-gray-950">
          {REFERENCE_DATA.LEVEL_GUIDE.map(({title, body}, _i) => {
            const lastPositionIndex = REFERENCE_DATA.LEVEL_GUIDE.length - 1;
            return (
              <View
                key={title}
                className={`${lastPositionIndex === _i ? '' : 'mb-3'}`}>
                <Text weight="bold" color="text-primary" className="mb-1">
                  {title}
                </Text>
                <Text color="text-gray-800 dark:text-white">{body}</Text>
              </View>
            );
          })}
        </View>
      </Container>
    </ScrollView>
  );
};

export default LevelGuide;
