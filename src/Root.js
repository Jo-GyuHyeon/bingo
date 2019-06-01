import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import configure from './store/configure';

const store = configure();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
