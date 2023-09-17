import {User as ProfileIcon} from '@/assets/icons/iconComponents';
import {View, Image} from 'react-native';
import {Button} from '@/components';
import CameraIcon from '@/assets/icons/camera.svg';
import {AvatarType} from './Avatar.types';

const Avatar = ({pickerResponse, handleOnPress}: AvatarType) => {
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <View className="rounded-full bg-neutral-600 w-16 h-16 justify-center items-center mr-6">
      {!uri ? (
        <ProfileIcon strokeColor="white" />
      ) : (
        <Image
          source={{uri: uri}}
          className="w-full h-full rounded-full"
          resizeMode="cover"
        />
      )}
      <Button
        label=""
        onPress={handleOnPress}
        buttonColor={'bg-orange-400'}
        className="absolute -right-1 bottom-0 rounded-full h-7 w-7 border-2 border-white dark:border-neutral-800"
        icon={<CameraIcon color="white" />}
      />
    </View>
  );
};

export default Avatar;
