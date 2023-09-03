/*
index.js
NAME
    index.js
SYNOPSIS
    Entry point for the application, responsible for rendering the root component and setting up the Redux store.
DESCRIPTION
    This file initializes the application, including rendering the root component, providing access to the Redux store, and injecting CSS styles with Material-UI's StyledEngineProvider.
PARAMETERS
    None.
RETURNS
    Initializes and renders the application's root component.
*/

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

