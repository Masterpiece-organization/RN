import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {View, Platform, TextInput} from 'react-native';
import {Text} from '@/components';
import {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
interface IGeolocation {
  latitude: number;
  longitude: number;
}

const Map = ({latitude = 37.5118203, longitude = 127.0591391}) => {
  const [location, setLocation] = useState<IGeolocation>({
    latitude: latitude,
    longitude: longitude,
  });
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
    Geocoder.init('AIzaSyDGufu-Qj4uvpKyS8FQ2mp8RIvS1ZE7UjM');
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  console.log(location);

  return (
    <>
      {/* <GooglePlacesAutocomplete
        minLength={2}
        placeholder="장소를 검색해보세요!"
        query={{
          key: 'AIzaSyDGufu-Qj4uvpKyS8FQ2mp8RIvS1ZE7UjM',
          language: 'ko',
          components: 'country:kr',
        }}
        keyboardShouldPersistTaps={'handled'}
        fetchDetails={true}
        onPress={(data, details) => {
          console.log(data, details);
        }}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        keepResultsAfterBlur={true}
        enablePoweredByContainer={false}
        textInputProps={{
          InputComp: TextInput,
          autoFocus: true,
          blurOnSubmit: false,
        }}
        // styles={styles.search}
      /> */}
      <View className="h-64 w-full flex-1">
        {location && (
          <MapView
            style={{flex: 1}}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChange={region => {
              setLocation({
                latitude: region.latitude,
                longitude: region.longitude,
              });
            }}
            onRegionChangeComplete={region => {
              setLocation({
                latitude: region.latitude,
                longitude: region.longitude,
              });
            }}>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          </MapView>
        )}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>주소: {address}</Text>
        </View>
        {/* <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={region => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          onRegionChangeComplete={region => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="this is a marker"
            description="this is a marker example"
          />
        </MapView> */}
      </View>
    </>
  );
};

export default Map;
