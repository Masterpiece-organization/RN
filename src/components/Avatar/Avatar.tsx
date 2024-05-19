import {View, Image} from 'react-native';
import {Button} from '@/components';
import {clsx} from 'clsx';
import {
  StyledCameraIcon,
  StyledMyIcon,
  StyledClubLogoIcon,
} from '@/constants/icons';
import {defaultAvartarWrapStyle} from '@/theme';

export const SIZE_TYPES = ['small', 'normal', 'large'];
export const AVARTAR_TYPES = ['user', 'club'];
export type SizeType = (typeof SIZE_TYPES)[number];
export type AvartarType = (typeof AVARTAR_TYPES)[number];

export interface AvatarProps {
  size?: SizeType;
  type?: AvartarType;
  source?: string;
  isIcon?: boolean;
  onPress?: () => void;
  className?: string;
}

const variants: {[size in SizeType]: string} = {
  small: `w-10 h-10 ${defaultAvartarWrapStyle}`,
  medium: `w-16 h-16 ${defaultAvartarWrapStyle}`,
  large: `w-[100px] h-[100px] ${defaultAvartarWrapStyle}`,
};

type IconSize = {[key in SizeType]: number};

const iconSize: IconSize = {
  small: 18,
  medium: 24,
  large: 36,
};

const Avatar = ({
  size = 'medium',
  type = 'user',
  source,
  isIcon = false,
  onPress,
  className,
}: AvatarProps) => {
  const avatarStyle = clsx(variants[size], className);

  return (
    <View className={avatarStyle}>
      {source ? (
        <Image
          source={{uri: source}}
          // source={require('@/assets/images/logo.png')}
          className="h-full w-full rounded-full border border-gray-50 dark:border-gray-800"
          resizeMode="cover"
        />
      ) : type === 'user' ? (
        <StyledMyIcon
          className="color-gray-300"
          width={iconSize[size]}
          height={iconSize[size]}
        />
      ) : (
        <StyledClubLogoIcon
          className="color-gray-300"
          width={iconSize[size] + 2}
          height={iconSize[size] + 2}
        />
      )}
      {isIcon && (
        <Button
          onPress={onPress}
          type="text"
          variant="custom"
          className="absolute bottom-0 right-0 rounded-full border border-gray-100 bg-white p-2 dark:border-gray-900 dark:bg-gray-600">
          <StyledCameraIcon className="color-gray-300" width={16} height={16} />
        </Button>
      )}
    </View>
  );
};
export default Avatar;
