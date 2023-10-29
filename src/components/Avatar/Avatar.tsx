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
    <View className={WrapStyle}>
      {!uri ? (
        <ProfileIcon
          strokeColor="#b0b0b0"
          width={34}
          height={34}
          fillColor="#b0b0b0"
          focused={true}
        />
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
        buttonColor={'bg-white'}
        className={IconStyle}
        icon={<CameraIcon color="#b0b0b0" />}
        disabled={disabled}
      />
    </View>
  );
};

export default Avatar;

const defaultStyle = {
  wrap: 'items-center justify-center rounded-full bg-gray-400',
  icon: 'absolute -right-1 bottom-0 rounded-full border border-gray-400',
};
