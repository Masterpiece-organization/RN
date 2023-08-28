import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {useIsMutating} from '@tanstack/react-query';

interface ContextState {
  colorScheme: ColorSchemeName;
  isMutating: number;
  user: boolean;
  setUser: Dispatch<SetStateAction<boolean>>;
}

interface ContextProps {
  children: ReactNode;
}

export const MainContext = createContext<ContextState | null>(null);

export function MainContextProvider({children}: ContextProps) {
  const colorScheme = useColorScheme();

  const isMutating = useIsMutating();

  const [user, setUser] = useState<boolean>(false);

  return (
    <MainContext.Provider
      value={{
        colorScheme,
        isMutating,
        user,
        setUser,
      }}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
