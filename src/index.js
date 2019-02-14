import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import plandateReducer from './reducers';
import App from './App';

const store = createStore(
  plandateReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // eslint-enable
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
