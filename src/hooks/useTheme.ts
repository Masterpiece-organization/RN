import {useCallback} from 'react';
import {useThemeContext} from '@/contexts/ThemeContext';
import {ColorSchemeName} from 'react-native';

interface themeParams {
  colorScheme: ColorSchemeName;
  dark: string;
  light: string;
}

export default function useTheme() {
  const {colorScheme} = useThemeContext();

  const colorBasedOnTheme = ({colorScheme, dark, light}: themeParams) => {
    return colorScheme === 'dark' ? dark : light;
  };

  const textColorThemes = useCallback(() => {
    const textBlack = colorBasedOnTheme({
      colorScheme,
      dark: 'text-white',
      light: 'text-black',
    });
    const textDark = colorBasedOnTheme({
      colorScheme,
      dark: ' text-white',
      light: 'text-gray-800',
    });
    const textGray = colorBasedOnTheme({
      colorScheme,
      dark: ' text-white',
      light: 'text-gray-400',
    });

    // const dark = colorBasedOnTheme(colorScheme, 'text-white', 'text-grey-800');
    // const gray = colorBasedOnTheme(
    //   colorScheme,
    //   'text-gray-600',
    //   'text-gray-800',
    // );

    // return {black, dark, gray};
    return {textBlack, textDark, textGray};
  }, [colorScheme]);

  const borderColorTheme = useCallback(() => {
    const borderDefault = colorBasedOnTheme(
      colorScheme,
      'border-black',
      'border-gray-600',
    );

    const borderGrey = colorBasedOnTheme(
      colorScheme,
      'border-gray-800',
      'border-gray-200',
    );

    const borderTopLightGrey = colorBasedOnTheme(
      colorScheme,
      'border-t-gray-800',
      'border-t-gray-200',
    );

    const borderWhite = colorBasedOnTheme(
      colorScheme,
      'border-white',
      'border-gray-600',
    );

    return {borderDefault, borderGrey, borderTopLightGrey, borderWhite};
  }, [colorScheme]);

  const backgroundTheme = useCallback(() => {
    const background = colorBasedOnTheme({
      colorScheme,
      dark: 'bg-black',
      light: 'bg-background',
    });

    const disabledInputbackground = colorBasedOnTheme({
      colorScheme,
      dark: 'bg-gray-800',
      light: 'bg-gray-200',
    });

    const cardBackground = colorBasedOnTheme({
      colorScheme,
      dark: 'bg-gray-800',
      light: 'bg-white',
    });

    const inputBackground = colorBasedOnTheme({
      colorScheme,
      dark: 'bg-black',
      light: 'bg-white',
    });

    const tagBackground = colorBasedOnTheme({
      colorScheme,
      dark: 'bg-gray-600',
      light: 'bg-background',
    });

    return {
      background,
      cardBackground,
      disabledInputbackground,
      inputBackground,
      tagBackground,
    };
  }, [colorScheme]);

  const colorHexTheme = useCallback(() => {
    const iconBlack = colorBasedOnTheme({
      colorScheme,
      dark: '#fff',
      light: '#121212',
    });

    const iconDark = colorBasedOnTheme({
      colorScheme,
      dark: '#fff',
      light: '#404040',
    });

    const iconGray = colorBasedOnTheme({
      colorScheme,
      dark: '#fff',
      light: '#b0b0b0',
    });

    const checkBackground = colorBasedOnTheme({
      colorScheme,
      dark: '#2e2e2e',
      light: '#fff',
    });

    const backgroundHex = colorBasedOnTheme({
      colorScheme,
      dark: '#121212',
      light: '#F2F4F6',
    });

    return {iconBlack, iconDark, iconGray, checkBackground, backgroundHex};
  }, [colorScheme]);

  return {
    textColorThemes,
    borderColorTheme,
    backgroundTheme,
    colorHexTheme,
  };
}
