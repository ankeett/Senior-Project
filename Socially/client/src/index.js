import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import store from './store';
import { StyledEngineProvider } from '@mui/material';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <StyledEngineProvider injectFirst>
      <App/>
    </StyledEngineProvider>
  </Provider>
);

