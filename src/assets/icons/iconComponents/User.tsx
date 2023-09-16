import Svg, {Path} from 'react-native-svg';
import {SvgIconProps} from '@/typings/IconTypeList';

const User = ({
  fillColor = 'none',
  strokeColor = 'currentColor',
  focused,
  className,
  width = 28,
  height = 28,
}: SvgIconProps) => {
  return (
    <Svg
      width={focused ? width + 2 : width}
      height={focused ? height + 2 : height}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill={fillColor}
      className={className}>
      <Path
        d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M12 12a4 4 0 100-8 4 4 0 000 8z"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default User;
