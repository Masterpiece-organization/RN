import Svg, {Path} from 'react-native-svg';

interface PositionSelectorProps {
  fill: string;
  stroke: string;
  className: string;
}

const PositionSelector = ({fill, stroke, className}: PositionSelectorProps) => {
  return (
    <Svg
      width="64"
      height="68"
      viewBox="0 0 64 68"
      fill="none"
      className={className}>
      <Path
        d="M39.75 3.05182L54.9269 11.8142C59.7226 14.583 62.6769 19.7 62.6769 25.2376V42.7624C62.6769 48.3 59.7226 53.417 54.9269 56.1858L39.75 64.9482C34.9543 67.717 29.0457 67.717 24.25 64.9482L9.07309 56.1858C4.27737 53.417 1.32309 48.3 1.32309 42.7624V25.2376C1.32309 19.7 4.27737 14.583 9.07309 11.8142L24.25 3.05182C29.0457 0.283006 34.9543 0.283007 39.75 3.05182Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

export default PositionSelector;
