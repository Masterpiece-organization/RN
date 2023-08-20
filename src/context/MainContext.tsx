import {createContext, ReactNode, useContext} from 'react';
import {ColorSchemeName, useColorScheme} from 'react-native';

interface ContextState {
  colorScheme: ColorSchemeName;
}

interface ContextProps {
  children: ReactNode;
}

export const MainContext = createContext<ContextState | null>(null);

export function MainContextProvider({children}: ContextProps) {
  const colorScheme = useColorScheme();

  return (
    <MainContext.Provider
      value={{
        colorScheme,
      }}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
