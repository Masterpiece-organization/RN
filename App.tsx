import React from 'react';
import Navigation from '@/navigation/index';
import {MainContextProvider} from '@/contexts/MainContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ApiProvider} from '@/contexts/ApiContext';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContextProvider>
        <ApiProvider>
          <Navigation />
        </ApiProvider>
      </MainContextProvider>
    </QueryClientProvider>
  );
}

export default App;
