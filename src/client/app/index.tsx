import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';

ReactDOM.hydrate(
  store ? (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ) : (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
  document.getElementById('app'),
);
