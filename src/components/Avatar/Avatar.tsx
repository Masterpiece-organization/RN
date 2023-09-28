import {User as ProfileIcon} from '@/assets/icons/iconComponents';
import {View, Image} from 'react-native';
import {Button} from '@/components';
import CameraIcon from '@/assets/icons/camera.svg';
import {AvatarType} from './Avatar.types';
import {clsx} from 'clsx';

const Avatar = ({
  className,
  pickerResponse,
  iconClassName,
  handleOnPress,
  disabled,
}: AvatarType) => {
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  const WrapStyle = clsx(className, defaultStyle.wrap);
  const IconStyle = clsx(iconClassName, defaultStyle.icon);

  return (
    // <View className="mr-6 h-16 w-16 items-center justify-center rounded-full bg-neutral-600">
    <View className={WrapStyle}>
      {!uri ? (
        <ProfileIcon strokeColor="white" />
      ) : (
        <Image
          source={{uri: uri}}
          className="h-full w-full rounded-full"
          resizeMode="cover"
        />
      )}
      <Button
        label=""
        onPress={handleOnPress}
        buttonColor={'bg-orange-400'}
        className={IconStyle}
        icon={<CameraIcon color="white" />}
        disabled={disabled}
      />
    </View>
  );
};

export default Avatar;

const defaultStyle = {
  wrap: 'items-center justify-center rounded-full bg-neutral-600',
  icon: 'absolute -right-1 bottom-0 rounded-full border-2 border-white dark:border-neutral-800',
};
