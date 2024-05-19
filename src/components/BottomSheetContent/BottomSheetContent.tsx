import {ReactNode} from 'react';
import {View, ScrollView} from 'react-native';
import {Button, CheckBox, Text} from '@/components';
import {BOTTOMSHEET_DATA} from '@/constants';
import {ContentTypes} from '@/constants/bottomSheetData';

interface BottomSheetContentProps {
  type?: ContentTypes;
  onPress?: () => void;
  onNavigateTo?: () => void;
  children?: ReactNode;
}

interface BottomSheetListProps {
  item: string;
  onPress: () => void;
}

const BottomSheetTitle = ({title}: {title: string}) => (
  <Text type="display" className="mb-5 px-5 text-xl">
    {title}
  </Text>
);

const CheckableListItem = ({item, onPress}: BottomSheetListProps) => {
  return (
    <Button type="text" variant="split" className="mb-5 px-5" onPress={onPress}>
      <Text className="text-lg" color="text-gray-700 dark:text-white">
        {item}
      </Text>
      <CheckBox type="solid" checked={false} />
    </Button>
  );
};

const BottomSheetContent = ({
  type,
  onPress = () => {},
  onNavigateTo,
  children,
}: BottomSheetContentProps) => {
  return (
    <View className="py-6">
      {type ? (
        <>
          <BottomSheetTitle
            title={BOTTOMSHEET_DATA.BOTTOMSHEET_CONTENT_LIST[type].title}
          />
          <View className="max-h-[400px]">
            <ScrollView scrollEnabled={type === 'location' ? true : false}>
              {BOTTOMSHEET_DATA.BOTTOMSHEET_CONTENT_LIST[type].data.map(
                (item, i) => (
                  <CheckableListItem
                    key={`${i}+${item}`}
                    item={item}
                    onPress={onPress}
                  />
                ),
              )}
              {type === 'level' && (
                <View className="mt-3 flex-1 items-center">
                  <Button
                    label="나의 레벨은?"
                    labelColor="text-blue"
                    type="text"
                    onPress={onNavigateTo}
                  />
                </View>
              )}
            </ScrollView>
          </View>
        </>
      ) : (
        children
      )}
    </View>
  );
};

export default BottomSheetContent;
