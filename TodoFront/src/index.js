import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';


import './style.css';
import 'font-awesome/css/font-awesome.css'


import configureStore from './store/configureStore';

const store = configureStore();
// store.dispatch(categoryActions.getAll());
render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
