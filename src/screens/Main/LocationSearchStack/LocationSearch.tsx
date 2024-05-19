import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  View,
  useColorScheme,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Text} from '@/components';
import {defaultInputStyle} from '@/theme';
import {
  LocationSearchScreens,
  LocationSearchScreenProps,
} from '@/types/navigationTypes';
import {GOOGLE_API_KEY} from '@env';

const createStyles = colorScheme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textInputContainer: {
      borderRadius: 8,
      height: 54,
      padding: 20,
    },
    textInput: {
      height: 54,
      fontSize: 16,
      marginRight: 10,
      paddingHorizontal: 20,
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
      color: colorScheme === 'light' ? '#16181A' : '#fff',
    },
    predefinedPlacesDescription: {
      color: '#DEE0E2',
    },
    poweredContainer: {},
    powered: {},
    listView: {
      marginTop: 24,
      backgroundColor: colorScheme === 'light' ? '#fff' : '#16181A',
      //   borderRadius: 8,
    },
    row: {
      backgroundColor: 'transparent',
      padding: 20,

      alignItems: 'center',
    },
    separator: {
      height: 1,
      backgroundColor: colorScheme === 'light' ? '#F2F4F6' : '#525456',
    },
    description: {},
    loader: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 20,
    },
  });

const LocationSearch = ({
  navigation,
}: LocationSearchScreenProps<LocationSearchScreens.LOCATION_SEARCH>) => {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  console.log(GOOGLE_API_KEY);

  return (
    <View className="relative flex-1 flex-row">
      <View
        className={`-z-1 absolute left-5 right-5 top-5 flex-1 ${defaultInputStyle}`}
      />
      <GooglePlacesAutocomplete
        minLength={2}
        placeholder="지번, 도로명, 건물명으로 검색"
        query={{
          key: GOOGLE_API_KEY,
          language: 'ko',
          components: 'country:kr',
        }}
        GooglePlacesSearchQuery={{
          rankby: 'prominence',
          types: 'stadium',
        }}
        keyboardShouldPersistTaps={'handled'}
        fetchDetails={true}
        onPress={(data, details) => {
          navigation.navigate(LocationSearchScreens.LOCATION_DETAIL, {
            data,
            details,
          });
        }}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        keepResultsAfterBlur={true}
        enablePoweredByContainer={false}
        renderRow={data => (
          <View>
            <Text weight="semibold">
              {data.structured_formatting.main_text}
            </Text>
            <View className="mt-2 flex-row items-center justify-center">
              <View className="mr-2 rounded-full bg-gray-50 px-1.5 py-1 dark:bg-gray-950">
                <Text
                  color="text-gray-700 dark:text-gray-300 text-xs"
                  weight="semibold">
                  도로명
                </Text>
              </View>
              <Text type="caption" color="text-gray-300">
                {data.structured_formatting.secondary_text}
              </Text>
            </View>
          </View>
        )}
        textInputProps={{
          autoFocus: true,
          blurOnSubmit: true,
        }}
        listLoaderComponent={
          <View className="h-52 flex-1 justify-center">
            <ActivityIndicator size="small" />
          </View>
        }
        styles={styles}
      />
    </View>
  );
};

export default LocationSearch;
