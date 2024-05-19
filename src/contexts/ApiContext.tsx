import {createContext, useContext} from 'react';
import {useIsMutating} from '@tanstack/react-query';
import {ContextProps, ApiContextState} from '@/types/contextTypeList';

const defaultValue = {
  isMutating: 0,
};

const ApiContext = createContext<ApiContextState>(defaultValue);

export const ApiContextProvider = ({children}: ContextProps) => {
  const isMutating = useIsMutating();

  const value = {isMutating};

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export function useApiContext() {
  return useContext(ApiContext);
}
