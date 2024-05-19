import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';
import {Text, Button} from '@/components';
import {IMGS} from '@/constants';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '@env';
import usePermissions from '@/hooks/usePermission';
import {
  LocationSearchScreenProps,
  LocationSearchScreens,
} from '@/types/navigationTypes';
import {StyledClipBoardIcon} from '@/constants/icons';
// import Geolocation from 'react-native-geolocation-service';
import Clipboard from '@react-native-community/clipboard';
import {showToast} from '@/utils/customToast';

interface IGeolocation {
  latitude: number;
  longitude: number;
}

interface MapScreenProps {
  location: IGeolocation;
  isDraggabled?: boolean;
  onRegionChange?: () => void;
  onRegionChangeComplete?: (newRegion: IGeolocation) => void;
}

const fetchAndSetAddress = async (
  latitude: number,
  longitude: number,
  setAddress: React.Dispatch<React.SetStateAction<string>>,
) => {
  try {
    const response = await Geocoder.from(latitude, longitude);
    const address = response.results[0].formatted_address;
    setAddress(address);
  } catch (error) {
    console.warn(error);
  }
};

const MapComponent = ({
  location,
  isDraggabled = true,
  onRegionChange = () => {},
  onRegionChangeComplete = () => {},
}: MapScreenProps) => (
  <MapView
    style={{flex: 1}}
    provider={PROVIDER_GOOGLE}
    initialRegion={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.0025,
    }}
    onRegionChange={onRegionChange}
    onRegionChangeComplete={onRegionChangeComplete}>
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      image={IMGS.markerIcon}
      draggable={isDraggabled}
    />
  </MapView>
);

const MapScreen = ({
  navigation,
  route: {
    params: {latitude = 37.5118203, longitude = 127.0591391, type},
  },
}: LocationSearchScreenProps<LocationSearchScreens.MAP_SCREEN>) => {
  const {getPermission} = usePermissions();

  const [location, setLocation] = useState<IGeolocation>({
    latitude: latitude,
    longitude: longitude,
  });
  const [address, setAddress] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    getPermission('location', undefined, () => navigation.goBack());
    Geocoder.init(GOOGLE_API_KEY, {language: 'ko'});
    // 현재 위치 구하기
    // if (Platform.OS === 'ios') {
    //     Geolocation.requestAuthorization('always');
    //   }
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const {latitude, longitude} = position.coords;
    //     setLocation({latitude, longitude});
    //   },
    //   error => {
    //     console.log(error.code, error.message);
    //   },
    //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    // );
  }, []);

  const onRegionChangeComplete = (region: IGeolocation) => {
    const {latitude, longitude} = region;
    setIsButtonDisabled(false);
    setLocation({latitude, longitude});
    fetchAndSetAddress(latitude, longitude, setAddress);
  };
  const onRegionChange = () => {
    setIsButtonDisabled(true);
  };

  const copyAddress = () => {
    Clipboard.setString(address);
    showToast('주소가 복사되었습니다.');
  };

  return (
    <View className="flex-1 justify-between">
      <MapComponent
        location={location}
        onRegionChange={type === 'detail' ? undefined : onRegionChange}
        onRegionChangeComplete={
          type === 'detail' ? undefined : onRegionChangeComplete
        }
        isDraggabled={type === 'detail' && false}
      />

      {type === 'posting' ? (
        <SafeAreaView className=" bg-white dark:bg-gray-950">
          <View className="px-5 pt-6">
            <Text weight="semibold" type="header" className="mb-5">
              {address}
            </Text>

            {/* TODO */}
            {/* button 클릭시 해당값 저장 */}
            <Button
              label="이 위치로 주소 설정"
              disabled={isButtonDisabled}
              onPress={() => navigation.goBack()}
            />
          </View>
        </SafeAreaView>
      ) : (
        <View className="absolute inset-x-0 top-8 z-10 items-center">
          <View className="flex-row rounded-full bg-white px-4 py-2 dark:bg-gray-950">
            <Text className="mr-2">{address}</Text>
            <View className="mr-2 w-[1px] bg-gray-100 dark:bg-gray-700" />
            <TouchableOpacity onPress={copyAddress}>
              <StyledClipBoardIcon
                className="color-gray-700 dark:color-white"
                height={22}
                width={22}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default MapScreen;
