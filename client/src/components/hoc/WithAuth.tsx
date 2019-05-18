import * as React from 'react';
import { inject, observer } from 'mobx-react';
import AuthStore from '../../store/AuthStore';
import AccountStore from '../../store/AccountStore';
import { Redirect } from 'react-router';

export interface WithAuthProps {
  authStore: typeof AuthStore;
  accountStore: typeof AccountStore;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
  inject('authStore', 'accountStore')(
    observer(
      class WithAuth extends React.Component<P & WithAuthProps> {
        state = {
          pending: true,
          loggedIn: false,
        };

        async checkAuth() {
          const { authStore, accountStore } = this.props;

          // 엑세스토큰 유무 체크
          const accessToken = authStore.loadAccessToken();
          if (!accessToken) {
            return this.setState({ pending: false, loggedIn: false });
          }

          // 계정정보 받아오기
          const accountDetails = await accountStore.fetchAccountDetails(
            accessToken,
          );
          if (!accountDetails.success) {
            return this.setState({ pending: false, loggedIn: false });
          }
          return this.setState({ pending: false, loggedIn: true });
        }

        render() {
          const { props, state } = this;
          const { pending, loggedIn } = state;
          const { accessToken } = props.authStore;

          if (pending) {
            return <span/>
          }

          if (!accessToken || !loggedIn) {
            return <Redirect to="/login" />;
          }

          return <WrappedComponent {...props as P} />;
        }

        componentDidMount(): void {
          this.checkAuth();
        }
      },
    ),
  );
export default withAuth;
