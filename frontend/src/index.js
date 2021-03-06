import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
//import configureStore from './config/configureStore';
import configureStore from './config/store';

const store = configureStore();

ReactDOM.render(
  <Provider  store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
