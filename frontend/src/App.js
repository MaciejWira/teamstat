import './styles/main.scss';

import React from 'react';

import { StateProvider } from './state/context';
import { mainReducer, initialState } from './state/reducers';
import AppCore from './AppCore';

function App() {

  return (
    <StateProvider reducer={mainReducer} initialState={initialState}>
      <AppCore />
    </StateProvider>
  );
}

export default App;
