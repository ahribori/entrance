import React, { Component } from 'react';
import AuthStore from '../../store/AuthStore';
import AccountStore from '../../store/AccountStore';
import withAuth from '../../components/hoc/WithAuth';
import MainLayout from '../../components/layout/MainLayout';
import routes from './routes';

interface IProps {
  authStore: typeof AuthStore;
  accountStore: typeof AccountStore;
}

@withAuth
class Layout extends Component<IProps, any> {
  render() {
    return <MainLayout>{routes}</MainLayout>;
  }
}

export default Layout;
