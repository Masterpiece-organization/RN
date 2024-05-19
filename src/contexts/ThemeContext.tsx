import {createContext, useContext, useState} from 'react';
import {
  ThemeContextState,
  ThemeModeList,
  ContextProps,
} from '@/types/contextTypeList';
import {useColorScheme} from 'react-native';

const defaultValue: ThemeContextState = {
  colorScheme: 'light',
  themeMode: 'system',
  isButtonActive: false,
  dispatch: {
    setCurrentThemeMode: () => {},
    openActionButton: () => {},
    closeActionButton: () => {},
  },
};

export const ThemeContext = createContext<ThemeContextState>(defaultValue);

export function ThemeContextProvider({children}: ContextProps) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeModeList>('system');
  const [isButtonActive, setIsButtonActive] = useState(false);

  const setCurrentThemeMode = (mode: ThemeModeList) => {
    setThemeMode(mode);
  };

  const openActionButton = () => {
    setIsButtonActive(true);
  };

  const closeActionButton = () => {
    setIsButtonActive(false);
  };

  let colorScheme = themeMode === 'system' ? systemColorScheme : themeMode;

  const value = {
    colorScheme,
    themeMode,
    isButtonActive,
    dispatch: {openActionButton, closeActionButton, setCurrentThemeMode},
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
