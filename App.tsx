import React from 'react';
import Navigation from '@/navigation/Navigation';
import {MainContextProvider} from '@/context/MainContext';

function App(): JSX.Element {
  return (
    <MainContextProvider>
      <Navigation />
    </MainContextProvider>
  );
}

export default App;
