import {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/typings/RootStackParamList';
import {Button, Text, PositionCheck, Container} from '@components/index';
import {useMainContext} from '@/contexts/MainContext';
import {useForm, SubmitHandler, FieldValues} from 'react-hook-form';
import FieldIcon from '@/assets/images/field.svg';
import {positions, positionsObj} from '@/data/position';
import showAlert from '@/utils/showAlert';

type PositionScreenProps = StackScreenProps<RootStackParamList, 'Position'>;

const windowWidth = Dimensions.get('window').width;

const Position = ({navigation, route}: PositionScreenProps) => {
  const contexts = useMainContext();

  const {...methods} = useForm({mode: 'onSubmit'});

  const [param, setParam] = useState<string>('');

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(param, selectedPositions);
  };

  useEffect(() => {
    if (route.params?.nickname) {
      setParam(route.params?.nickname);
    }
  }, [route.params?.nickname]);

  const handlePress = (position: string) => {
    const selectedId = positionsObj.find(pos => pos.position === position);

    if (selectedId) {
      const index = selectedPositions.findIndex(id => id === selectedId.id);

      if (index !== -1) {
        setSelectedPositions(prevSelectedPositions =>
          prevSelectedPositions.filter(id => id !== selectedId.id),
        );
      } else {
        if (selectedPositions.length < 3) {
          setSelectedPositions(prevSelectedPositions => [
            ...prevSelectedPositions,
            selectedId.id,
          ]);
        } else {
          showAlert({
            title: '잠깐만요!',
            message: '최대 3개의 포지션만 선택할 수 있어요.',
            onPress: () => null,
          });
        }
      }
    }
  };
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);

  return (
    <Container scroll={true}>
      <SafeAreaView className="flex">
        <View className="justify-center pt-8 ">
          <Text type="title" className="text-bold mb-3">
            선호하는 포지션
          </Text>
          <Text
            textColor={
              contexts?.colorScheme === 'dark'
                ? 'text-white'
                : 'text-neutral-600'
            }>
            축구에서 가장 재미있게 뛸 수 있는 포지션을 골라보세요! 포지션은 최대
            3개까지만 선택 가능합니다.
          </Text>
        </View>
      </SafeAreaView>

      <View className="mt-9 relative w-full">
        <View className="z-10 p-6" style={{height: (windowWidth - 40) * 1.618}}>
          <View className="gap-5 justify-center flex-1">
            {positions.map((row, rowIndex) => (
              <View
                key={rowIndex}
                className={
                  row.length > 1
                    ? 'justify-between flex-row'
                    : 'justify-center flex-row'
                }>
                {row.map(position => (
                  <TouchableWithoutFeedback
                    onPress={() => handlePress(position)}
                    key={position}>
                    <View>
                      <PositionCheck
                        text={position}
                        checked={selectedPositions.includes(
                          positionsObj.find(pos => pos.position === position)
                            ?.id || 0,
                        )}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View
          className="absolute z-0"
          style={{width: windowWidth - 40, height: (windowWidth - 40) * 1.618}}>
          <FieldIcon width="100%" height="100%" />
        </View>

        <View className="pt-5 pb-8">
          <Button
            label="포지션 설정"
            onPress={methods.handleSubmit(onSubmit)}
            isLoading={!!contexts?.isMutating}
            className="mb-2"
          />
        </View>
      </View>
    </Container>
  );
};

export default Position;
