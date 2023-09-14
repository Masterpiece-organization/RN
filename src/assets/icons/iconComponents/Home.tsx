import Svg, {Path} from 'react-native-svg';
import {SvgIconProps} from '@/typings/IconTypeList';

const Home = ({
  fillColor = 'none',
  strokeColor = 'currentColor',
  focused
}: SvgIconProps) => {
  return (
    <Svg
      width={focused ? "26" : "24"}
      height={focused ? "26" : "24"}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill={fillColor}
      >
      <Path
        d="M9 21H7a4 4 0 01-4-4v-6.292a4 4 0 011.927-3.421l5-3.03a4 4 0 014.146 0l5 3.03A4 4 0 0121 10.707V17a4 4 0 01-4 4h-2m-6 0v-4a3 3 0 013-3v0a3 3 0 013 3v4m-6 0h6"
        stroke={strokeColor}
        // strokeWidth={focused ? ".5" : "1.5"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Home;
