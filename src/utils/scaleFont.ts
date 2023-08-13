import {PixelRatio} from 'react-native';

const scaleFont = (size: number) => {
  const newSize = PixelRatio.getFontScale() * size;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export default scaleFont;
