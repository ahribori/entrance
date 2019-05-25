import React, { Component } from 'react';
import AuthStore from '../../store/AuthStore';
import AccountStore from '../../store/AccountStore';
import withAuth from '../../components/hoc/WithAuth';
import MainLayout from '../../components/layout/MainLayout';
import routes from './routes';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
  authStore: typeof AuthStore;
  accountStore: typeof AccountStore;
}

@withAuth
class Layout extends Component<IProps, any> {
  render() {
    const { accountDetails } = this.props.accountStore;
    return (
      <MainLayout
        accountDetails={accountDetails}
        pathname={this.props.location.pathname}
      >
        {routes}
      </MainLayout>
    );
  }
}

export default Layout;
