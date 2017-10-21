import React  from 'react';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';
import Todo from './components/Todo'
import Register from './components/Register'
import Login from './components/Login'

import App from './containers/App'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Todo}></IndexRoute>
   	<Route path="/login" component={Login}></Route>
   	<Route path="/register" component={Register}></Route>
   
  </Route>
)
