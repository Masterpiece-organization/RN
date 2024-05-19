import Svg, {Path} from 'react-native-svg';
import {SvgIconProps} from '@/types/IconTypeList';

const Home = ({
  fillColor = 'none',
  strokeColor,
  classNames,
  width = 24,
  height = 24,
}: SvgIconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      className={classNames}>
      <Path
        d="M9.02 2.83999L3.63 7.03999C2.73 7.73999 2 9.22999 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28999 21.19 7.73999 20.2 7.04999L14.02 2.71999C12.62 1.73999 10.37 1.78999 9.02 2.83999Z"
        fill={fillColor}
      />
      <Path
        d="M12 17.99V14.99"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Home;
