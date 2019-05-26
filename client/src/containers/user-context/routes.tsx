import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const loadDynamic = (dynamicImport: Promise<any>) =>
  Loadable({
    loader: () => dynamicImport,
    loading: Loading,
  });

const Index = loadDynamic(import('./pages/Index'));
const PasswordChange = loadDynamic(import('./pages/ChangePassword'));

export default (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route exact path="/password-change" component={PasswordChange} />
    <Route render={() => <Redirect to="/" />} />
  </Switch>
);
