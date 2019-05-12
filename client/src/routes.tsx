import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const loadDynamic = (dynamicImport: Promise<any>) =>
  Loadable({
    loader: () => dynamicImport,
    loading: Loading,
  });

const Login = loadDynamic(import('./containers/Login'));
const SignUp = loadDynamic(import('./containers/SignUp'));
const PasswordReset = loadDynamic(import('./containers/PasswordReset'));

// @ts-ignore
export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/password-reset" component={PasswordReset} />
  </Switch>
);
