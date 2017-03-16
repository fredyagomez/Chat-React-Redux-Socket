import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import './styles/styles.scss';

//Redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';

import App from './components/App';


const middleware = [ thunk ];
middleware.push(createLogger());

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);


require('../img/favicon.ico');
let element = document.getElementById('app');
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, element);
  
document.body.classList.remove('loading');
