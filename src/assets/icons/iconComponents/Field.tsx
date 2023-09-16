import Svg, {Path} from 'react-native-svg';
import {SvgIconProps} from '@/typings/IconTypeList';

const Field = ({
  fillColor = 'none',
  strokeColor = 'currentColor',
  focused,
  className,
  width = 26,
  height = 22,
}: SvgIconProps) => {
  return (
    <Svg
      width={focused ? width + 2 : width}
      height={focused ? height + 2 : height}
      viewBox="0 0 22 16"
      fill={fillColor}
      strokeWidth="1.5"
      className={className}>
      <Path
        d="M11 1H20.4C20.4788 1 20.5568 1.01552 20.6296 1.04567C20.7024 1.07583 20.7685 1.12002 20.8243 1.17574C20.88 1.23145 20.9242 1.29759 20.9543 1.37039C20.9845 1.44319 21 1.52121 21 1.6V14.4C21 14.4788 20.9845 14.5568 20.9543 14.6296C20.9242 14.7024 20.88 14.7685 20.8243 14.8243C20.7685 14.88 20.7024 14.9242 20.6296 14.9543C20.5568 14.9845 20.4788 15 20.4 15H11M11 1H1.6C1.44087 1 1.28826 1.06321 1.17574 1.17574C1.06321 1.28826 1 1.44087 1 1.6V14.4C1 14.5591 1.06321 14.7117 1.17574 14.8243C1.28826 14.9368 1.44087 15 1.6 15H11M11 1V15"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <Path
        d="M1 12H5V8V4H1M21 12H17V8V4H21M11 11C10.2044 11 9.44129 10.6839 8.87868 10.1213C8.31607 9.55871 8 8.79565 8 8C8 7.20435 8.31607 6.44129 8.87868 5.87868C9.44129 5.31607 10.2044 5 11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14 8.79565 13.6839 9.55871 13.1213 10.1213C12.5587 10.6839 11.7956 11 11 11Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Field;
