// React
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/app/app';
import Dashboard from './components/dashboard/dashboard';
import Admin from './components/admin/admin';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="admin" component={Admin} />
    </Route>
  </Router>
), document.getElementById('root'));
