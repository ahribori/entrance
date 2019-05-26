import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const loadDynamic = (dynamicImport: Promise<any>) =>
  Loadable({
    loader: () => dynamicImport,
    loading: Loading,
  });

const MyAccount = loadDynamic(import('./pages/MyAccount'));
const PasswordChange = loadDynamic(import('./pages/ChangePassword'));
const LoginHistory = loadDynamic(import('./pages/LoginHistory'));
const ServiceManagement = loadDynamic(import('./pages/ServiceManagement'));
const ApplicationManagement = loadDynamic(
  import('./pages/ApplicationManagement'),
);

export default (
  <Switch>
    <Route exact path="/" component={MyAccount} />
    <Route exact path="/password-change" component={PasswordChange} />
    <Route exact path="/login-history" component={LoginHistory} />
    <Route exact path="/service-management" component={ServiceManagement} />
    <Route
      exact
      path="/application-management"
      component={ApplicationManagement}
    />
    <Route render={() => <Redirect to="/" />} />
  </Switch>
);
