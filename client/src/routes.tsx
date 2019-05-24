import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const loadDynamic = (dynamicImport: Promise<any>) =>
  Loadable({
    loader: () => dynamicImport,
    loading: Loading,
  });

const UserContext = loadDynamic(import('./containers/user-context/Layout'));
const Login = loadDynamic(import('./containers/Login'));
const SignUp = loadDynamic(import('./containers/SignUp'));
const SignUpSuccess = loadDynamic(import('./containers/SignUpSuccess'));
const SendPasswordResetCode = loadDynamic(
  import('./containers/SendPasswordResetCode'),
);
const SendPasswordResetCodeSuccess = loadDynamic(
  import('./containers/SendPasswordResetCodeSuccess'),
);
const PasswordReset = loadDynamic(import('./containers/PasswordReset'));
const PasswordResetSuccess = loadDynamic(
  import('./containers/PasswordResetSuccess'),
);

export default (
  <Switch>
    <Route exact path="/" component={UserContext} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/signup/success" component={SignUpSuccess} />
    <Route
      exact
      path="/send-password-reset-code"
      component={SendPasswordResetCode}
    />
    <Route
      exact
      path="/send-password-reset-code/success"
      component={SendPasswordResetCodeSuccess}
    />
    <Route exact path="/password-reset" component={PasswordReset} />
    <Route
      exact
      path="/password-reset/success"
      component={PasswordResetSuccess}
    />
  </Switch>
);
