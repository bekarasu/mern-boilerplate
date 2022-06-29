import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { configureStore } from './store';
import { Provider } from 'react-redux';

export const store = configureStore(); // store variable for using in whole admin panel app , you can use dispatch via this object

render(
  <BrowserRouter basename="/admin">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
