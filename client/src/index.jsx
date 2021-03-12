import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import App from './components/App';

const devCompose = composeWithDevTools(applyMiddleware(thunk));
const prodCompose = applyMiddleware(thunk);
const shouldCompose = process.env.NODE_ENV === 'development'
  ? devCompose : prodCompose;

const store = createStore(
  rootReducer,
  shouldCompose
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
