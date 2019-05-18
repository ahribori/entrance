import * as React from 'react';
import { inject, observer } from 'mobx-react';
import AuthStore from '../../store/AuthStore';
import { Redirect } from 'react-router';

export interface WithAuthProps {
  authStore: typeof AuthStore;
  auth: string;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
  inject('authStore')(
    observer(
      class WithAuth extends React.Component<P & WithAuthProps> {
        state = {
          pending: true,
          loggedIn: false,
        };

        async checkAuth() {
          // const { authStore } = this.props;
          // const accessToken = AuthStore.loadAccessToken();

          return this.setState({ pending: false, loggedIn: true });
        }

        render() {
          const { props, state } = this;
          const { pending, loggedIn } = state;
          if (pending) {
            return <div />;
          }
          if (!loggedIn) {
            return <Redirect to="/login" />;
          }
          return <WrappedComponent {...props as P} auth="auth" />;
        }

        componentDidMount(): void {
          this.checkAuth();
        }
      },
    ),
  );
export default withAuth;
