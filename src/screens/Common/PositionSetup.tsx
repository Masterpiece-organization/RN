import {useCallback, useState} from 'react';
import {View, ScrollView, useColorScheme, StyleSheet} from 'react-native';
import {CommonScreens, CommonScreenProps} from '@/types/navigationTypes';
import {Button, TitleSection, Text, PositionSelector} from '@/components';
import useUser from '@/hooks/useUser';
import PositionUniformIcon from '@/assets/icons/position_uniform.svg';
import {containerStyle} from '@/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {REFERENCE_DATA} from '@/constants';

interface ParamsTypes {
  nickname: string;
  position?: string;
}

const PositionSetup = ({navigation, route}: CommonScreenProps) => {
  const colorScheme = useColorScheme();

  const {updateUserInfoQuery} = useUser();

  const [param, setParam] = useState<ParamsTypes>({
    nickname: '',
    position: '',
  });

  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);

  const onSubmit = () => {
    const {nickname} = param;

    navigation.navigate(CommonScreens.SUCCESS, {
      type: 'register',
    });

    // updateUserInfoQuery.mutate(
    //   {nickname, position: selectedPositions},
    //   {
    //     onSuccess: () => {
    //       if (param.position === '') {
    //         navigation.navigate('Success', {
    //           name: 'register',
    //         });
    //       } else {
    //         showAlert({
    //           title: '프로필 변경',
    //           message: '프로필이 성공적으로 업데이트되었습니다.',
    //           onPress: () => navigation.navigate('Profile'),
    //         });
    //       }
    //     },
    //     onError: err => {
    //       const error = err as Error;
    //       const message = error.message;

    //       console.log(message);
    //     },
    //   },
    // );
  };

  const handlePress = (selectedId: number) => {
    if (selectedPositions.includes(selectedId)) {
      const newSelectedPositions = [...selectedPositions];
      newSelectedPositions.splice(selectedPositions.indexOf(selectedId), 1);
      setSelectedPositions(newSelectedPositions);
    } else if (selectedPositions.length < 3) {
      setSelectedPositions(prev => [...prev, selectedId]);
    }
  };

  const getColor = useCallback(
    (id: number) => {
      if (selectedPositions.includes(id)) {
        if (id > 11) {
          return {fill: '#FCEBE9', stroke: '#EA3829', color: '#EA3829'};
        } else if (id > 6) {
          return {fill: '#E6F7F1', stroke: '#00AD71', color: '#00AD71'};
        } else if (id > 1) {
          return {fill: '#E6F1FC', stroke: '#3D9BFF', color: '#3D9BFF'};
        } else {
          return {fill: '#FFF8EB', stroke: '#FFBB33', color: '#FFBB33'};
        }
      } else {
        return colorScheme === 'dark'
          ? {fill: '#2A2C2E', stroke: '#2A2C2E', color: '#66686A'}
          : {fill: '#F2F4F6', stroke: '#F2F4F6', color: '#dee0e2'};
      }
    },
    [selectedPositions, colorScheme],
  );

  return (
    <>
      <ScrollView>
        <View className={containerStyle('detail')}>
          <TitleSection
            title={'포지션을 선택해주세요.'}
            body={
              '축구에서 가장 재미있게 뛸 수 있는 포지션을 골라보세요! 포지션은 최대 3개 까지만 선택 가능합니다.'
            }
          />
          <View className="relative space-y-4">
            {REFERENCE_DATA.ICON_COUNTS.map(({count}, index) => {
              let justifyContent;
              if (count === 1) {
                justifyContent = 'justify-center';
              } else if (count === 2) {
                justifyContent = 'justify-evenly';
              } else {
                justifyContent = 'justify-between';
              }

              return (
                <View
                  className={`flex-row ${justifyContent} relative`}
                  key={index}>
                  {Array(count)
                    .fill(null)
                    .map((_, i) => {
                      const id = REFERENCE_DATA.ICON_COUNTS[index].id[i];
                      const {fill, stroke, color} = getColor(id);

                      return (
                        <Button
                          key={i}
                          type="text"
                          variant="custom"
                          onPress={() =>
                            handlePress(REFERENCE_DATA.ICON_COUNTS[index].id[i])
                          }>
                          <View className="relative">
                            <PositionSelector
                              className={
                                count === 2
                                  ? i === 0
                                    ? '-translate-y-2'
                                    : 'translate-y-2'
                                  : ''
                              }
                              fill={fill}
                              stroke={stroke}
                            />
                            <View className="absolute left-0 top-0 h-full w-full items-center justify-center pt-1.5">
                              <PositionUniformIcon
                                color={color}
                                style={
                                  count === 2
                                    ? i === 0
                                      ? {
                                          transform: [{translateY: -4}],
                                        }
                                      : {
                                          transform: [{translateY: 12}],
                                        }
                                    : {}
                                }
                              />
                              <Text
                                weight={
                                  selectedPositions.includes(
                                    REFERENCE_DATA.ICON_COUNTS[index].id[i],
                                  )
                                    ? 'bold'
                                    : 'medium'
                                }
                                className={`${
                                  count === 2
                                    ? i === 0
                                      ? 'mb-3'
                                      : 'mt-4'
                                    : 'mt-1'
                                }`}
                                color={
                                  selectedPositions.includes(
                                    REFERENCE_DATA.ICON_COUNTS[index].id[i],
                                  )
                                    ? REFERENCE_DATA.ICON_COUNTS[index].id[i] >
                                      11
                                      ? 'text-red'
                                      : REFERENCE_DATA.ICON_COUNTS[index].id[
                                          i
                                        ] > 6
                                      ? 'text-green'
                                      : REFERENCE_DATA.ICON_COUNTS[index].id[
                                          i
                                        ] > 1
                                      ? 'text-primary'
                                      : 'text-yellow'
                                    : 'text-gray-700'
                                }>
                                {REFERENCE_DATA.ICON_COUNTS[index].postion[i]}
                              </Text>
                            </View>
                          </View>
                        </Button>
                      );
                    })}
                </View>
              );
            })}
            <View className="absolute -top-2 -z-10 aspect-[5/7] w-full justify-between">
              <View className="relative items-center justify-center">
                <View
                  className="h-16 w-16 border border-gray-50 dark:border-gray-300"
                  style={styles.mapTop}
                />
                <View className="absolute left-0 top-1/2 h-[2px] w-full scale-x-150 bg-gray-50 dark:bg-gray-300" />
              </View>
              <View className="relative items-center justify-center">
                <View
                  className="h-12 w-48 border-2 border-gray-50 dark:border-gray-300"
                  style={styles.mapBottom}
                />
                <View className="absolute -bottom-[.5px] left-0 h-[2px] w-full scale-x-150 bg-gray-50 dark:bg-gray-300" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView>
        <View className="flex-1">
          <Button
            label="포지션 설정"
            onPress={onSubmit}
            className="absolute bottom-0 left-5 right-5 "
            float
            disabled={selectedPositions.length < 1}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PositionSetup;

const styles = StyleSheet.create({
  mapTop: {
    borderRadius: 50,
    transform: [{scaleX: 2}],
  },
  mapBottom: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transform: [{perspective: 20}, {rotateX: '2deg'}],
  },
});
